<?php

use Zelarayan\Usuario;

require_once("../Usuario.php");

$usuarioJson = isset($_POST["usuarioJson"]) ? $_POST["usuarioJson"] : null;

if ($usuarioJson) {
    $obj = json_decode($usuarioJson);
    $usuario = Usuario::TraerUsuarioJSON($obj->id, "./archivos/puntajes.json");
    if ($usuario) {
        $puntaje_actual = $obj->puntajes[0];
        $puntaje_maximo = $usuario->puntajes[0];
        if ($puntaje_actual > $puntaje_maximo) {
            $usuario_mod = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
            echo Usuario::ModificarUsuario($usuario_mod, "./archivos/puntajes.json");
        } else {
            echo json_encode(array("exito" => true, "mensaje" => "Puntaje maximo no superado!"));
        }
    } else {
        $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
        echo $usuario->GuardarUsuario("./archivos/puntajes.json");
    }
}
