<?php


require 'Slim/Slim.php';
require 'helper.php';
include('logging/logInit.php');
require_once('dbHelper.php');

\Slim\Slim::registerAutoloader();
/*
 * $log->logg('page','message','priority','class','mail');
 * Page: This is the page where the log is placed. Set to 1 and it will be automatically detected.
Message: This is the message you want to have the log store. You can have some preset messages which are stored in the log.class.php file. Set to 1 to have a preset message stored.
Priority: This is the priority or Importance of the log entry. Values can be: High,Medium,Low.
Class: This is the class you want the log entry to have. Values are: Red, Danger, Yellow, Green, and Blue.
Mail: This setting can be yes or no. If it is not specified it will be set to "no".

 * */

$app = new \Slim\Slim();

$app->get('/concerts', 'getConcerts');
$app->get('/concerts/:id', 'getConcert');
$app->get('/concerts/search/:query', 'findByName');
$app->run();


function getConcerts()
{
    $database = new DB();
    global $log;
    try {
        $query = "select id_conciertos,id_sala,codigo_fecha,ciudad,sala,precio_ant,precio_taq,imagen FROM conciertos ORDER BY grupos";
        $concerts = $database->get_results( $query );
        echo json_encode($concerts);
    } catch (PDOException $e) {
        $log->logg('1', $e->getMessage(), 'High', 'Danger', 'no');

    }
}

function getConcert($id)
{
    $database = new DB();
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

/*
function findByName($query)
{
    $sql = "SELECT * FROM concerts WHERE UPPER(name) LIKE :query ORDER BY name";
    global $log;
    try {
        $db = Helper::getConnection();
        $stmt = $db->prepare($sql);
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
*/

?>