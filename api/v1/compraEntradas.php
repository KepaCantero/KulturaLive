<?php



//Function to check if the request is an AJAX request
function is_ajax()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function validarGrupo($idGroup)
{
   global $database;

    $query =  "SELECT * FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= " . helper::fechaActual() . "
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =". $_GET[$idGroup] ;


    $grupo_disponible=$database->num_rows( $query );
    if( $grupo_disponible > 0 )
        return true;
    else
        return false;


}
function validarEntradaDisponibles ($idConcierto)
{

    global $database;

    $query = "SELECT num_entradas FROM conciertos WHERE id_conciertos= ".$idConcierto;
    $entradas_disponibles=$database->num_rows( $query );
    if( $entradas_disponibles > 0 )
    {
        if ( $_POST['nentradas'] > $entradas_disponibles) {
            return false;
        }
        else{
            return true;
        }
    }
    else
    {
        return false;
    }

}
function validarEntrada($entrada)
{

    global $log;
    $nombre = $entrada->show_item("nombre");
    $apellidos = $entrada->show_item("apellidos");
    $dni = $entrada->show_item("dni");
    $email = $entrada->show_item("email");


    if (helper::verify_dni($dni) != 'OK') {
        $msg = "Dni no valido";
        return false;
    }
    elseif ($nombre . value . length != 0 && $apellidos . value . length != 0) {
        $msg = ("Nombre o Apellido no correcto");
        $log->logg('1', $msg, 'Medium', 'Yellow', 'yes');
        return false;
    } elseif (helper::verify_email($email)) {
        $msg = "E-mail incorrecta.";
        $log->logg('1', $msg, 'Medium', 'Yellow', 'yes');
        return false;
    } elseif (helper::verify_group($idGrupo)) {
        $msg = "Grupo no valido.";
        $log->logg('1', $msg, 'Medium', 'Yellow', 'yes');
        return false;

    }
    return true;

}

function crearEntrada($entrada,$nombre,$apellidos, $dni, $email, $idGrupo, $nentradas)
{

    $grupo_sin_espacios = str_replace(" ", "", $_POST['grupos']);
    $grupo_sin_espacios = str_replace("+", "", $grupo_sin_espacios);
    $grupo_sin_espacios = strtoupper(substr($grupo_sin_espacios, 0, 5));


    global $database;


    $query =  "SELECT precio_ant,precio_comision,printathome FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= " . helper::fechaActual() . "
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =". $idGrupo;


    $grupo_disponible=$database->num_rows( $query );

    if( $grupo_disponible > 0 )
    {
        $row=$database->get_row( $query );
        $precio_ant=  $row[0];
        $precio_comision=$row[1];
        $printathome=$row[2];

        $entrada->add_item($_GET['id'],
            $grupo_sin_espacios,
            strip_tags(sql_quote($nombre)),
            strip_tags(sql_quote($apellidos)),
            strip_tags(sql_quote($dni)),
            strip_tags(sql_quote($email)),
            abs($nentradas),
            $precio_ant,
            $precio_comision,
            $printathome
        );

        $entrada->change_estado(); // Ponemos a "OK" el estado de la entrada
    }
    else
    {}//sendMessage();
}