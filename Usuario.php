<?php

namespace Zelarayan;

use stdClass;

class Usuario
{
    public string $id;
    public string $nombre;
    public int $nivel;
    public array $puntajes;
    public array $tiempos;

    public function __construct(
        string $id = "",
        string $nombre = "",
        int $nivel = 0,
        array $puntajes = array(0, 0, 0),
        array $tiempos = array("", "", "")
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->nivel = $nivel;
        $this->puntajes = $puntajes;
        $this->tiempos = $tiempos;
    }

    public function ToJSON(): string
    {
        return json_encode($this);
    }

    public function GuardarUsuario(string $ruta): string
    {
        $exito = false;
        $mensaje = "No se pudo guardar el Usuario";
        //ABRO EL ARCHIVO
        $ar = fopen($ruta, "a"); //A - append
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

    public static function TraerUsuariosJSON($ruta): array
    {
        $array_usuarios = array();

        //ABRO EL ARCHIVO
        // "./archivos/usuarios.json"
        $ar = fopen($ruta, "r");
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
                $obj = json_decode($array_contenido[$i]);
                $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
                array_push($array_usuarios, $usuario);
            }
        }

        return $array_usuarios;
    }

    public static function TraerUsuarioJSON($id, $ruta)
    {
        $usuario_retorno = null;
        //ABRO EL ARCHIVO
        $ar = fopen($ruta, "r");
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
                $obj = json_decode($array_contenido[$i]);
                $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
                if ($usuario->id == $id) {
                    $usuario_retorno = $usuario;
                    break;
                }
            }
        }

        return $usuario_retorno;
    }

    public static function ValidarUsuario(string $id, $ruta): bool
    {
        $retorno = false;
        //ABRO EL ARCHIVO
        $ar = fopen($ruta, "r");
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
                $obj = json_decode($array_contenido[$i]);
                $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
                if ($usuario->id == $id) {
                    $retorno = true;
                    break;
                }
            }
        }

        return $retorno;
    }

    public static function ModificarUsuario(Usuario $usuarioMod, $ruta): string
    {
        $exito = false;
        $mensaje = "No se pudo modificar el usuario";
        $array_usuarios = array();
        //ABRO EL ARCHIVO
        $ar = fopen($ruta, "r");
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
                $obj = json_decode($array_contenido[$i]);
                $usuario = new Usuario($obj->id, $obj->nombre, $obj->nivel, $obj->puntajes, $obj->tiempos);
                if ($usuario->id == $usuarioMod->id) {
                    array_push($array_usuarios, $usuarioMod->ToJSON() . ",\r\n");
                    $exito = true;
                    $mensaje = "Usuario modificado";
                } else {
                    array_push($array_usuarios, $usuario->ToJSON() . ",\r\n");
                }
            }
        }

        $ar = fopen($ruta, "w");
        //ESCRIBO EN EL ARCHIVO
        foreach ($array_usuarios as $item) {
            fwrite($ar, $item);
        }
        //CIERRO EL ARCHIVO
        fclose($ar);

        return json_encode(array("exito" => $exito, "mensaje" => $mensaje));
    }


    //##########################################################################
}
