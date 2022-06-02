<?php
require_once("../Usuario.php");

$usuarioJson = isset($_POST["usuarioJson"]) ? $_POST["usuarioJson"] : null;

if ($usuarioJson) {
    $obj = json_decode($usuarioJson);
    $usuario = Usuario::TraerPuntajeUsuario($obj->id);
    if ($usuario) {
        $puntaje_actual = $obj->puntaje;
        $puntaje_maximo = $usuario->puntaje;
        if ($puntaje_actual > $puntaje_maximo) {
            $usuario_mod = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntaje, $obj->tiempo);
            echo Usuario::ModificarPuntajeUsuario($usuario_mod);
        } else {
            echo json_encode(array("exito" => true, "mensaje" => "Puntaje maximo no superado!"));
        }
    } else {
        $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntaje, $obj->tiempo);
        echo $usuario->GuardarPuntajeUsuario();
    }
}
