<?php

/*
#  Title: Entradas 1.0
#  Filename: class.entrada.php
#  Date: 2010-17-09
#  Developer: info@proto-web.net
*/


class sEntrada
{
    var $id;
    var $grupos;
    var $nombre;
    var $apellidos;
    var $dni;
    var $email;
    var $nentradas;
    var $precio;
    var $comision;
    var $estado;
    var $tprecio;
    var $tcomision;
    var $importe;
    var $printathome;

    function sEntrada()
    {
        $this->_init();
    }

    function add_item($id,$grupos,$nombre,$apellidos,$dni,$email,$nentradas,$precio,$comision,$printathome,$estado="KO")
    {
        $this->id	     = $id;
        $this->grupos	 = $grupos;
        $this->nombre    = $nombre;
        $this->apellidos = $apellidos;
        $this->dni 		 = $dni;
        $this->email     = $email;
        $this->nentradas = abs(sprintf("%d", $nentradas));
        $this->precio    = abs(sprintf("%0.2f", $precio));
        $this->comision  = abs(sprintf("%0.2f", $comision));
        $this->printathome  = $printathome;

        $this->_calc();
    }

    function show_item($campo)
    {
        return $this->$campo;
    }

    function change_estado()
    {
        $this->estado = "OK";
    }

    function _init()
    {
        $this->id   	 = null;
        $this->grupos    = "";
        $this->nombre    = "";
        $this->apellidos = "";
        $this->dni       = "";
        $this->email     = "";
        $this->nentradas = 0;
        $this->precio    = 0.00;
        $this->comision  = 0.00;
        $this->estado    = "KO";
        $this->tprecio   = 0.00;
        $this->tcomision = 0.00;
        $this->importe	 = 0.00;
        $this->printathome = 0;
    }


    function _calc()
    {
        $this->tcomision = abs(sprintf("%0.2f", $this->comision * $this->nentradas));
        $this->tprecio   = abs(sprintf("%0.2f", $this->precio * $this->nentradas));
        $this->importe   = abs(sprintf("%0.2f", $this->tcomision + $this->tprecio));
    }

    function clear()
    {
        unset($this);
        $this->_init();
    }

}


