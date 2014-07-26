<?php
class Helper {

    public static function getConnection() {
        $dbhost="mysql.hostinger.es";
        $dbuser="u251348866_root";
        $dbpass="7rosamu5";
        $dbname="u251348866_bdpru";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

   /* public static function getConnection() {
        $dbhost="localhost";
        $dbuser="root";
        $dbpass="7rosamu5";
        $dbname="bdprueba";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
*/
   }