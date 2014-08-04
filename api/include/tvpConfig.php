<?
/* Archivo de Configuración del TPV de CECA
/* DIRECCIONES Y PRUEBAS;
 *
 * Pruebas:
 * http://tpv.ceca.es:8000/cgi-bin/tpv

 *
 * Tarjeta de pruebas para el año 2010
 * 5540500001000004
 * 989
 * Caducidad : 12 2010
*/



global $HTTP_POST_VARS;

$terminal='2';
$currency='978';
$transactionType='0';
$urlMerchant='http://www.kulturalive.com';
$producto='Comercio';


$url_tpv = "http://tpv.ceca.es:8000/cgi-bin/tpv"; // Dirección Pruebas


$Clave = "79438127"; // Clave de Encriptación Pruebas

$MerchantID = "012130696";
$AcquirerBIN = "0000554053";
$TerminalID = "00000003";

$Referencia = "";
$Tipomoneda = "978";
$Exponente = "2";
$Cifrado = "SHA1";

$URL_OK  = "http://www.kulturalive.com/index.php?len=".$len;
$URL_NOK = "http://www.kulturalive.com/index.php?len=".$len;


?>