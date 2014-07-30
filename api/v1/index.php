<?php

require_once '../include/helper.php';
require_once '../include/logInit.php';
require_once '../include/dbHelper.php';
require_once '../include/Entrada.php';
require '.././libs/Slim/Slim.php';
require_once 'compraEntradas.php';


\Slim\Slim::registerAutoloader();
/*
 * $log->logg('page','message','priority','class','mail');
 * Page: This is the page where the log is placed. Set to 1 and it will be automatically detected.
Message: This is the message you want to have the log store. You can have some preset messages which are stored in the logger.php file. Set to 1 to have a preset message stored.
Priority: This is the priority or Importance of the log entry. Values can be: High,Medium,Low.
Class: This is the class you want the log entry to have. Values are: Red, Danger, Yellow, Green, and Blue.
Mail: This setting can be yes or no. If it is not specified it will be set to "no".

 * */
header("Access-Control-Allow-Origin: *");
$app = new \Slim\Slim();

$app->get('/concerts', 'getConcerts');
$app->get('/concerts/:id', 'getConcert');
$app->get('/concerts/search/:query', 'findByName');

function validateEmail($email) {
    $app = \Slim\Slim::getInstance();
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $app->stop();
        return false;
    }
    return true;

}

function validarDatosEntrada($entrada)
{

    global $log;
    $nombre = $entrada->show_item("nombre");
    $apellidos = $entrada->show_item("apellidos");
    $dni = $entrada->show_item("dni");
    $email = $entrada->show_item("email");


    if (helper::verify_dni($dni) != 'OK') {

        $response["error"] = true;
        $response["message"] = 'DNI no es valido';
        echoResponse(400, $response);
        return false;
    }
    elseif (strlen($nombre) == 0 && strlen($apellidos) == 0) {

        $response["error"] = true;
        $response["message"] = 'Nombre o Apellidos incorrecto';
        echoResponse(400, $response);

        return false;
    }
    elseif  (!validateEmail($email)) {

        $msg = "E-mail incorrecta.";
        $response["error"] = true;
        $response["message"] = 'Email no es valido';
        echoResponse(400, $response);

        return false;
    }

    return true;

}

function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);
    // setting response content type to json
    $app->contentType('application/json');
    echo json_encode($response);
}

function verifyRequiredParams($required_fields) {
    $error = false;
    $error_fields = "";
    $request_params = array();
    $request_params = $_REQUEST;
    // Handling PUT request params
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }
    foreach ($required_fields as $field) {
        if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(400, $response);
        $app->stop();
    }
}

$app->post('/comprarentrada', function() use ($app) {
    // check for required params
    global $database;
    global $log;

    //verifyRequiredParams(array('nombre', 'apellidos', 'dni', 'email','nentradas', 'idGrupo','grupos'));

    $response = array();

   /* $nombre = "kepa";
    $dni = "20223532T";
    $apellidos = "cantero";
    $email = "kcantero@gmail.com";

    $idGrupo =  "2195";
    $nentradas =  "2";
    $grupos= "eskorbuto";
*/
    //echo "aqui-0-";
   $dni = $database->filter( $app->request->post("dni"));
    $apellidos = $database->filter( $app->request->post("apellidos"));
    $email = $database->filter( $app->request->post('email'));
    $nombre = $database->filter( $app->request->post("nombre"));
    $idGrupo =  $database->filter($app->request->post("idGrupo"));
    $nentradas =  $database->filter($app->request->post("nentradas"));
     $grupos=$database->filter($app->request->post("grupos"));

    $entrada = new sEntrada();
    // "kepa0";
    crearEntrada($entrada,$nombre,$apellidos, $dni, $email, $idGrupo, $nentradas,$grupos);
   //echo "kepa1";
    if (validarDatosEntrada($entrada)) {
        if (validarGrupo($idGrupo))
        {
            if (validarEntradaDisponibles($entrada->show_item("id"),$entrada->show_item("nentradas")))
            {

                $response["error"] = false;
                $response["message"] = "La entrada esta validada";
                echoResponse(200, $response);

            }
            else
            {
                //echo "kepa5";
                $response["error"] = true;
                $response["message"] = "No hay entradas disponibles";
                echoResponse(500, $response);
            }
        }
        else
        {

            $response["error"] = true;
            $response["message"] = "El grupo no actua en esas fechas";
            echoResponse(501, $response);
        }
    }


});

$app->run();
function getConcerts()
{
    global $database;
    global $log;
    try {
        $query = "select id_conciertos,id_sala,codigo_fecha,ciudad,sala,precio_ant,precio_taq,imagen FROM conciertos ORDER BY grupos";
        $response["error"] = false;
        $response["concerts"] = array();

        $concerts = $database->get_results( $query );

        $response["concerts"]=$concerts;

        //$response["concerts"] = json_encode($concerts);
        echoResponse(200, $response);


    } catch (PDOException $e) {
        $log->logg('1', $e->getMessage(), 'High', 'Danger', 'no');

    }
}

function getConcert($id)
{
    global $database;
    global $log;
    $query = "SELECT id_conciertos,id_sala,codigo_fecha,ciudad,sala,precio_ant,precio_taq,imagen FROM conciertos WHERE". $id ;

    if( $database->num_rows( $query ) > 0 )
    {
        echo json_enconde($database->get_row( $query ));

    }
    else
    {
         $log->logg('1', "No results in GetConcerts with id:" .$id, 'High', 'Danger', 'no');
    }

}


function findByName($query)
{
    $sql = "SELECT * FROM concerts WHERE UPPER(name) LIKE :query ORDER BY name";
    global $database;
    global $log;
    try {

        $stmt = $database->prepare($sql);
        $query = "%" . $query . "%";
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $concerts = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"wine": ' . json_encode($concerts) . '}';
    } catch (PDOException $e) {
        $log->logg('1', $e->getMessage(), 'High', 'Danger', 'no');
    }
}



?>