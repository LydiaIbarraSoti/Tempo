<?php

$db;

function conexion_cliente($nombreBD = "soticomm_VIDO_MASTER")
//function conexion_cliente($nombreBD = "nndoqbmy_VIDO_MASTER")
{
    // $hostname_conexion = "localhost"; // ACTIVAR PARA SUBIR AL HOST
     if ($nombreBD == "")
        $nombreBD = "soticomm_VIDO_MASTER";

    $hostname_conexion = "soti.com.mx";
    $username_conexion = "soticomm_VIDO";
    $password_conexion = "Vido_2024";
    $db_name = $nombreBD;
    $GLOBALS['db'] = new mysqli($hostname_conexion, $username_conexion, $password_conexion, $db_name, 3306);
    $GLOBALS['db']->set_charset('utf8');


    // $hostname_conexion = "localhost"; // ACTIVAR PARA SUBIR AL HOST
    /*if ($nombreBD == "")
        $nombreBD = "nndoqbmy_VIDO_MASTER";

    $hostname_conexion = "automercadeovido.com";
    $username_conexion = "nndoqbmy_VIDO";
    $password_conexion = "Vido_2024.";
    $db_name = $nombreBD;
    $GLOBALS['db'] = new mysqli($hostname_conexion, $username_conexion, $password_conexion, $db_name, 3306);
    $GLOBALS['db']->set_charset('utf8');*/
}

?> 