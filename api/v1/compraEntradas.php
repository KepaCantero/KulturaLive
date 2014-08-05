<?php

require_once '../include/tvpConfig.php';

//Function to check if the request is an AJAX request
function is_ajax()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function validarGrupo($idGroup)
{
    global $database;
    global $app;
  /*  $query = "SELECT * FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= ".helper::fechaActual()."
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =" . $idGroup;
*/
    $query = "SELECT * FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =" . $idGroup;

    $grupo_disponible = $database->num_rows($query);
    if ($grupo_disponible <= 0) {
        $response["error"] = true;
        $response["message"] = "El grupo no actua en esas fechas";
        helper::echoResponse(500, $response);
        $app->stop();
    }


}

function validarEntradaDisponibles($idConcierto, $nentradas)
{

    global $database;
    global $app;
    $query = "SELECT num_entradas FROM conciertos WHERE id_conciertos= " . $idConcierto;
    $entradas_disponibles = $database->get_row($query);
    if ($entradas_disponibles[0] > 0) {
        if ($entradas_disponibles[0] < $nentradas) {
            $response["error"] = true;
            $response["message"] = "No hay entradas disponibles1";
            helper::echoResponse(501, $response);
            $app->stop();
        }

    } else {
        $response["error"] = true;
        $response["message"] = "No hay entradas disponibles";
        helper::echoResponse(501, $response);
        $app->stop();
    }

}

function validarDatosEntrada($entrada)
{


    global $app;
    $nombre = $entrada->show_item("nombre");
    $apellidos = $entrada->show_item("apellidos");
    $dni = $entrada->show_item("dni");
    $email = $entrada->show_item("email");


    if (helper::verify_dni($dni) != 'OK') {

        $response["error"] = true;
        $response["message"] = 'DNI no es valido';
        helper::echoResponse(400, $response);
        $app->stop();

    } else
    if (strlen($nombre) == 0 && strlen($apellidos) == 0) {

        $response["error"] = true;
        $response["message"] = 'Nombre o Apellidos incorrecto';
        helper::echoResponse(400, $response);
        $app->stop();


    } elseif (!validateEmail($email)) {

        $response["error"] = true;
        $response["message"] = 'Email no es valido';
        helper::echoResponse(400, $response);
        $app->stop();


    }

}


function crearEntrada($entrada, $nombre, $apellidos, $dni, $email, $idGrupo, $nentradas, $grupos)
{

    $grupo_sin_espacios = str_replace(" ", "", $grupos);
    $grupo_sin_espacios = str_replace("+", "", $grupo_sin_espacios);
    $grupo_sin_espacios = strtoupper(substr($grupo_sin_espacios, 0, 5));
    global $database;
    global $app;
    global $log;

 /*
    $query = "SELECT precio_ant,precio_comision,printathome FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= ".helper::fechaActual()."
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =" . $idGrupo;
*/

    $query = "SELECT precio_ant,precio_comision,printathome FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =" . $idGrupo;

    $grupo_disponible = $database->num_rows($query);

    if ($grupo_disponible > 0) {

        $row = $database->get_row($query);
        $precio_ant = $row[0];
        $precio_comision = $row[1];
        $printathome = $row[2];

        $entrada->add_item($idGrupo,
            $grupo_sin_espacios,
            strip_tags(helper::sql_quote($nombre)),
            strip_tags(helper::sql_quote($apellidos)),
            strip_tags(helper::sql_quote($dni)),
            strip_tags(helper::sql_quote($email)),
            abs($nentradas),
            $precio_ant,
            $precio_comision,
            $printathome

        );
        $entrada->change_estado(); // Ponemos a "OK" el estado de la entrada
    }
    else
    {
        $response["error"] = true;
        $response["message"] = 'Error en la BD';
        helper::echoResponse(400, $response);
        $log->logg('1', 'Error en la BD, no se ha podido crear la entrada. query: '.$query , 'High', 'Danger', 'no');
        $app->stop();

    }

}

function insertarEntrada($entrada)
{
    global $Clave , $MerchantID, $AcquirerBIN, $TerminalID;
    global $Tipomoneda,$Exponente,$Referencia,$Cifrado,$URL_OK,$URL_NOK;
    global $database;
    global $app;

    $amount = $entrada->show_item("importe") * 100;

			// Generaci�n del numero de pedido:
	$xidconcierto = $entrada->show_item("id");
	$xmes = date('m');
	$xdia = date('d');
	$xfecha = date('ymdHis');

	$xvaleatorio = rand(10000, 99999);

	// N�mero de operaci�n
	$Num_operacion = $xidconcierto."_".$xfecha."_".$xvaleatorio."_".$entrada->show_item("grupos");

	// Importe total
	$Importe = $amount;

	//$string = "cgi-bin/calculo  $Clave $MerchantID $AcquirerBIN $TerminalID $Num_operacion $Importe $Tipomoneda $Exponente \"\"";
	//$resultado = exec($string);

	$resultado = sha1($Clave.$MerchantID.$AcquirerBIN.$TerminalID.$Num_operacion.$Importe.$Tipomoneda.$Exponente.$Referencia.$Cifrado.$URL_OK.$URL_NOK);

	$fechaActual 	= helper::fechaActual();
	$nombreCompleto = $entrada->show_item("nombre")." ".$entrada->show_item("apellidos");
	$nombre			= $entrada->show_item('nombre');
	$apellidos 		= $entrada->show_item('apellidos');
	$dni 			= $entrada->show_item('dni');
	$email 			= $entrada->show_item('email');
	$nentradas 		= $entrada->show_item('nentradas');
	$id 			= $entrada->show_item('id');
	$printathome	= $entrada->show_item('printathome');



    $entrada_output = array(
        "MerchantID"=>$MerchantID,
        "AcquirerBIN"=>$AcquirerBIN,
        "TerminalID"=>$AcquirerBIN,
        "Num_operacion"=>$Num_operacion,
        "Importe"=>$Importe,
        "TipoMoneda"=>$Tipomoneda,
        "Exponente"=>$Exponente,
        "URL_OK"=>$Exponente,
        "Cifrado"=>"SHA1",
        "URL_NOK"=>$URL_NOK,
        "Firma"=>$resultado,
        "Idioma"=>1,
        "Pago_soportado"=>"SSL",

);

    $entrada_values = array(
        'num_operacion' => $Num_operacion,
        'nombre' =>$nombreCompleto, //Random thing to insert
        'nombreN' =>$nombre, //Random thing to insert
        'apellidos' =>$apellidos, //Random thing to insert
        'dni' =>$dni, //Random thing to insert
        'email' =>$email, //Random thing to insert
        'nentradas' =>$nentradas, //Random thing to insert
        'id_conciertos' => $id,
        'codigo_fecha_entradas' => $fechaActual,
        'confirmada' =>'0',
        'printathome' => $printathome
    );

    $insert_query = $database->insert( 'entradas', $entrada_values );
    if(! $insert_query )
    {
        $response["error"] = true;
        $response["message"] = 'No ha sido posible actualizar la BD con la nueva entrada';
        helper::echoResponse(400, $response);
        $app->stop();

    }
    else
    {
        $response["error"] = false;
        $response["message"] = "La entrada esta validada";
        $response["entrada"] = array();
        $response["entrada"] = $entrada_output;
        helper::echoResponse(200, $response);
    }
    # Vaciamos la entrada


}