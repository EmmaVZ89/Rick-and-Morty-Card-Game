<?php
use Zelarayan\Usuario;

require_once("../Usuario.php");

$usuarios = Usuario::TraerUsuariosJSON("./archivos/puntajes.json");
if($usuarios){
    // ordeno el array segun sus puntajes
    usort($usuarios, function($a, $b) {
        return  $b->puntajes[0] - $a->puntajes[0];
    });
    echo json_encode($usuarios);
}
