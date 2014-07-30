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
							AND c.codigo_fecha >= CURRENT_DATE()
							AND c.visible = 'Si'
							AND c.entrada_inet = 1
							AND c.num_entradas > 0
							AND c.id_conciertos =". $idGroup ;


    $grupo_disponible=$database->num_rows( $query );
    if( $grupo_disponible > 0 )
        return true;
    else
        return false;


}
function validarEntradaDisponibles ($idConcierto,$nentradas)
{

    global $database;
    $query = "SELECT num_entradas FROM conciertos WHERE id_conciertos= ".$idConcierto;
    $entradas_disponibles=$database->get_row( $query );
    if( $entradas_disponibles[0] > 0 )
    {
        if ( $nentradas> $entradas_disponibles) {
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





function crearEntrada($entrada,$nombre,$apellidos, $dni, $email, $idGrupo, $nentradas,$grupos)
{

    $grupo_sin_espacios = str_replace(" ", "", $grupos);
    $grupo_sin_espacios = str_replace("+", "", $grupo_sin_espacios);
    $grupo_sin_espacios = strtoupper(substr($grupo_sin_espacios, 0, 5));
    global $database;


    $query =  "SELECT precio_ant,precio_comision,printathome FROM conciertos c, conciertos_descripcion cd, salas s
							WHERE cd.id_conciertos=c.id_conciertos AND cd.idioma ='cas'
							AND c.id_sala = s.id_sala
							AND c.codigo_fecha >= CURRENT_DATE()
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