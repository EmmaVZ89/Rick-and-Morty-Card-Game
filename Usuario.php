<?php

namespace Zelarayan;

use stdClass;

class Usuario
{
    public string $nombre;
    public int $nivel;
    public array $puntajes;
    public array $tiempos;

    public function __construct(
        string $nombre = "",
        int $nivel = 0,
        array $puntajes = array(0, 0, 0),
        array $tiempos = array(0, 0, 0)
    ) {
        $this->nombre = $nombre;
        $this->nivel = $nivel;
        $this->puntajes = $puntajes;
        $this->tiempos = $tiempos;
    }

    public function ToJSON(): string
    {
        return json_encode($this);
    }

    public function GuardarEnArchivo(): string
    {
        $exito = false;
        $mensaje = "No se pudo guardar el Usuario";
        //ABRO EL ARCHIVO
        $ar = fopen("./backend/archivos/usuarios.json", "a"); //A - append
        //ESCRIBO EN EL ARCHIVO CON FORMATO: $this->ToJSON()
        $cant = fwrite($ar, "{$this->ToJSON()},\r\n");
        if ($cant > 0) {
            $exito = true;
            $mensaje = "Usuario Guardado con exito";
        }
        //CIERRO EL ARCHIVO
        fclose($ar);

        //Creo array asociativo para luego parsearlo a JSON
        $retorno = array("exito" => $exito, "mensaje" => $mensaje);

        return json_encode($retorno);
    }

    public static function TraerTodosJSON(): array
    {
        $array_usuarios = array();

        //ABRO EL ARCHIVO
        $ar = fopen("./archivos/usuarios.json", "r");
        $contenido = "";
        //LEO LINEA X LINEA DEL ARCHIVO 
        while (!feof($ar)) {
            $contenido .= fgets($ar);
        }
        //CIERRO EL ARCHIVO
        fclose($ar);

        $array_contenido = explode(",\r\n", $contenido);

        for ($i = 0; $i < count($array_contenido); $i++) {
            if ($array_contenido[$i] != "") {
                $usuarioJson = json_decode($array_contenido[$i], true);
                $usuario = new Usuario(0, $usuarioJson["nombre"], $usuarioJson["correo"], $usuarioJson["clave"]);
                array_push($array_usuarios, $usuario);
            }
        }

        return $array_usuarios;
    }
}
