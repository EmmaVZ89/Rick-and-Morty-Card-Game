<?php

use Zelarayan\Usuario;

require_once("../Usuario.php");

$usuarios = Usuario::TraerUsuariosJSON("./archivos/puntajes.json");
if ($usuarios) {
    // ordeno el array segun sus puntajes
    usort($usuarios, function ($a, $b) {
        $minA = intval(explode(":", $a->tiempos[0])[0]);
        $minB = intval(explode(":", $b->tiempos[0])[0]);
        $segA = intval(explode(".", explode(":", $a->tiempos[0])[1])[0]);
        $segB = intval(explode(".", explode(":", $b->tiempos[0])[1])[0]);
        $milA = intval(explode(".", explode(":", $a->tiempos[0])[1])[1]);
        $milB = intval(explode(".", explode(":", $b->tiempos[0])[1])[1]);

        $retorno = 0;
        if (
            $a->puntajes[0] < $b->puntajes[0] ||
            ($a->puntajes[0] == $b->puntajes[0] && compararTiempos($minA, $minB, $segA, $segB, $milA, $milB))
        ) {
            $retorno = 1;
        } else {
            $retorno = -1;
        }
        return $retorno;
        // return  $b->puntajes[0] - $a->puntajes[0];
    });
    echo json_encode($usuarios);
}

function compararTiempos(int $minA, int $minB, int $segA, int $segB, int $milA, int $milB)
{
    $retorno = false;
    
    $segundosA = $minA*60 + $segA + $milA/100;
    $segundosB = $minB*60 + $segB + $milB/100;

    if($segundosA > $segundosB) {
        $retorno = true;
    }

    return $retorno;
}
