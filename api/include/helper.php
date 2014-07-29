<?php

class Helper
{

/*
   public static function verify_group($idGroup)
    {
        global $database;

        $CONSULTA = $database->consulta("SELECT * FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= " . fechaActual() . "
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos = $_GET[$idGroup]
						   ");


        // Si el concierto existe y cumple las condiciones
        if ($database->num_rows($CONSULTA) > 0) {
            return true;
        } else {
            return false;
        }
 }
*/


    public static function verify_email($email)
    {
        return filter_var(filter_var($email, FILTER_SANITIZE_EMAIL), FILTER_VALIDATE_EMAIL);
    }

    public static function verify_dni($dni)
    {
        if (strlen($dni) < 9) {
            return "DNI demasiado corto.";
        }

        $dni = strtoupper($dni);

        $letra = substr($dni, -1, 1);
        $numero = substr($dni, 0, 8);

        // Si es un NIE hay que cambiar la primera letra por 0, 1 ó 2 dependiendo de si es X, Y o Z.
        $numero = str_replace(array('X', 'Y', 'Z'), array(0, 1, 2), $numero);

        $modulo = $numero % 23;
        $letras_validas = "TRWAGMYFPDXBNJZSQVHLCKE";
        $letra_correcta = substr($letras_validas, $modulo, 1);

        if ($letra_correcta != $letra) {
            return "Letra incorrecta, la letra deber&iacute;a ser la $letra_correcta.";
        } else {
            return "OK";
        }
    }

// FUNCI�N PARA OBTENER FECHA ACTUAL EN FORMATO CODIFICACI�N LARGA
    public static function fechaActual()
    {

        if (date("n") > 3 and date("n") < 10) {
            $datoActual = 1;
        } else {
            $datoActual = -1;
        }

        $FECHAACTUAL = mktime(date("H"), date("i"), 00, date("n"), date("d"), date("Y"), $datoActual);

        return ($FECHAACTUAL);
    }
}