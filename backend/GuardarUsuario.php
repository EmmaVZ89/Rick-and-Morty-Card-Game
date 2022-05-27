<?php

use Zelarayan\Usuario;

require_once("../Usuario.php");

$usuarioJson = isset($_POST["usuarioJson"]) ? $_POST["usuarioJson"] : null;

if ($usuarioJson) {
    $obj = json_decode($usuarioJson);
    $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
    if (Usuario::ValidarUsuario($usuario->id, "./archivos/usuarios.json")) {
        echo Usuario::ModificarUsuario($usuario, "./archivos/usuarios.json");
    }
}
