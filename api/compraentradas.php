<?php
require_once 'Entradas.php';
require 'Slim/Slim.php';
require 'helper.php';
include('logging/logInit.php');

echo "Hello World 0";

$log->logg('1','this is a message','High','Danger','yes');

echo "Hello World 1";


/*
if (is_ajax()) {
    if (isset($_POST["nombre"]) && isset($_POST["apellidos"]) && isset($_POST["numEntradas"])
        && isset($_POST["email"])
        && isset($_POST["DNI"])
        && isset($_POST["conciertoID"])
        && isset($_POST["fecha"])
    )

    {
        $entrada= new Entradas();
        $entrada->nombre=$nombre= $_POST["nombre"];
        $entrada->apellidos= $_POST["apellidos"];
        $entrada->numEntradas= $_POST["numEntradas"];
        $entrada->email= $_POST["email"];
        $entrada->dni=   $_POST["DNI"];
        $entrada->fecha=   $_POST["fecha"];
    }
}

//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

*/
