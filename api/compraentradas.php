<?php
require_once 'class.Entrada.php';
require 'Slim/Slim.php';
require 'helper.php';
include('logging/logInit.php');


if (is_ajax()) {
    if (isset($_POST["nombre"]) && isset($_POST["apellidos"]) && isset($_POST["numEntradas"])
        && isset($_POST["email"])
        && isset($_POST["DNI"])
        && isset($_POST["conciertoID"])
        && isset($_POST["fecha"])
    ) {
        $entrada = new sEntrada();
        crearEntrada($entrada);
        global $log;
        if (validarEntrada($entrada, $log)) {
            //enviar los datos a tvp.php o a nuestra version del mismo
        }
    }
}

//Function to check if the request is an AJAX request
function is_ajax()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function validarEntrada($entrada, $log)
{
    $nombre = $entrada->show_item("nombre");
    $apellidos = $entrada->show_item("apellidos");
    $dni = $entrada->show_item("dni");
    $email = $entrada->show_item("email");
    $idGrupo = $entrada->show_item("idGrupo");

    if (helper::verify_dni($dni) != 'OK') {
        $msg = "Dni no valido";
        return false;
    } elseif ($nombre . value . length != 0 && $apellidos . value . length != 0) {
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

function crearEntrada($entrada)
{

    $grupo_sin_espacios = str_replace(" ", "", $_POST['grupos']);
    $grupo_sin_espacios = str_replace("+", "", $grupo_sin_espacios);
    $grupo_sin_espacios = strtoupper(substr($grupo_sin_espacios, 0, 5));

    #Creamos objeto entrada


    #Vamos a�adiendo los datos
    $entrada->add_item($_GET['id'],
        $grupo_sin_espacios,
        strip_tags(sql_quote($_POST['nombre'])),
        strip_tags(sql_quote($_POST['apellidos'])),
        strip_tags(sql_quote($_POST['dni'])),
        strip_tags(sql_quote($_POST['email'])),
        abs($_POST['nentradas']),
        $resultados['precio_ant'],
        $resultados['precio_comision'],
        $resultados['printathome']
    );

    $entrada->change_estado(); // Ponemos a "OK" el estado de la entrada


}
