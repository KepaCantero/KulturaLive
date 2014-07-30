<?php



//Function to check if the request is an AJAX request
function is_ajax()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function validarGrupo($idGroup)
{
    global $database;
    global $app;
    $query = "SELECT * FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= CURRENT_DATE()
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

    global $log;
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

    } elseif (strlen($nombre) == 0 && strlen($apellidos) == 0) {

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


    $query = "SELECT precio_ant,precio_comision,printathome FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= CURRENT_DATE()
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

}