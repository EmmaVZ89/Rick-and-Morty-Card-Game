<?php
require_once("../Usuario.php");

$usuarioJson = isset($_POST["usuarioJson"]) ? $_POST["usuarioJson"] : null;

if ($usuarioJson) {
    $obj = json_decode($usuarioJson);
    $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntaje, $obj->tiempo);
    // Valido si el usuario esta en la base de datos, si existe me devuelve uno, sino null
    if (Usuario::TraerUsuario($obj->id)) {
        echo Usuario::ModificarUsuario($usuario);
    }
}
