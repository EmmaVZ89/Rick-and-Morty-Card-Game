<?php
require_once "accesoDatos.php";

class Usuario
{
    public int $id;
    public string $nombre;
    public int $nivel;
    public int $puntaje;
    public string $tiempo;

    public function __construct(
        int $id = 0,
        string $nombre = "",
        int $nivel = 0,
        int $puntaje = 0,
        string $tiempo = ""
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->nivel = $nivel;
        $this->puntaje = $puntaje;
        $this->tiempo = $tiempo;
    }

    public function ToJSON(): string
    {
        return json_encode($this);
    }

    //##########################################################################
    // CRUD USUARIOS
    public function GuardarUsuario(): string
    {
        $exito = false;
        $mensaje = "No se pudo guardar el Usuario";

        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta("INSERT INTO jugadores (id, nombre, nivel, puntaje, tiempo) "
            . "VALUES(:id, :nombre, :nivel, :puntaje, :tiempo)");

        $consulta->bindValue(":id", $this->id, PDO::PARAM_INT);
        $consulta->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(":nivel", $this->nivel, PDO::PARAM_INT);
        $consulta->bindValue(":puntaje", $this->puntaje, PDO::PARAM_INT);
        $consulta->bindValue(":tiempo", $this->tiempo, PDO::PARAM_STR);
        $exito = $consulta->execute();

        if ($exito) {
            $mensaje = "Usuario Guardado con exito";
        }

        $retorno = json_encode(array("exito" => $exito, "mensaje" => $mensaje));

        return $retorno;
    }

    public static function TraerUsuarios(): array
    {
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM jugadores"
        );
        $consulta->execute();

        $array_usuarios = array();
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $id = $fila["id"];
            $nombre = $fila["nombre"];
            $nivel = $fila["nivel"];
            $puntaje = $fila["puntaje"];
            $tiempo = $fila["tiempo"];
            $usuario = new Usuario($id, $nombre, $nivel, $puntaje, $tiempo);
            array_push($array_usuarios, $usuario);
        }

        return $array_usuarios;
    }

    public static function TraerUsuario($id)
    {
        $usuario = null;
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM jugadores WHERE id = :id"
        );
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $id = $fila["id"];
            $nombre = $fila["nombre"];
            $nivel = $fila["nivel"];
            $puntaje = $fila["puntaje"];
            $tiempo = $fila["tiempo"];
            $usuario = new Usuario($id, $nombre, $nivel, $puntaje, $tiempo);
        }

        return $usuario;
    }

    public static function ModificarUsuario(Usuario $usuarioMod): string
    {
        $exito = false;
        $mensaje = "No se pudo modificar el usuario";
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();

        $cadena =
            "UPDATE jugadores SET nombre = :nombre, nivel = :nivel, puntaje = :puntaje, 
        tiempo = :tiempo WHERE id = :id";
        $consulta = $accesoDatos->retornarConsulta($cadena);

        $consulta->bindValue(":id", $usuarioMod->id, PDO::PARAM_INT);
        $consulta->bindValue(":nombre", $usuarioMod->nombre, PDO::PARAM_STR);
        $consulta->bindValue(":nivel", $usuarioMod->nivel, PDO::PARAM_INT);
        $consulta->bindValue(":puntaje", $usuarioMod->puntaje, PDO::PARAM_INT);
        $consulta->bindValue(":tiempo", $usuarioMod->tiempo, PDO::PARAM_STR);
        $consulta->execute();

        $total_modificado = $consulta->rowCount();
        if ($total_modificado == 1) {
            $exito = true;
            $mensaje = "Usuario Modificado!";
        }

        $retorno = json_encode(array("exito" => $exito, "mensaje" => $mensaje));

        return $retorno;
    }

    public static function EliminarUsuario($id)
    {
        $retorno = false;
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta("DELETE FROM jugadores WHERE id = :id");
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        $total_borrado = $consulta->rowCount();
        if ($total_borrado == 1) {
            $retorno = true;
        }

        return $retorno;
    }

    //##########################################################################
    //##########################################################################
    // CRUD PUNTAJES
    public function GuardarPuntajeUsuario(): string
    {
        $exito = false;
        $mensaje = "No se pudo guardar el Usuario";

        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta("INSERT INTO puntajes (id, nombre, nivel, puntaje, tiempo) "
            . "VALUES(:id, :nombre, :nivel, :puntaje, :tiempo)");

        $consulta->bindValue(":id", $this->id, PDO::PARAM_INT);
        $consulta->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(":nivel", $this->nivel, PDO::PARAM_INT);
        $consulta->bindValue(":puntaje", $this->puntaje, PDO::PARAM_INT);
        $consulta->bindValue(":tiempo", $this->tiempo, PDO::PARAM_STR);
        $exito = $consulta->execute();

        if ($exito) {
            $mensaje = "Usuario Guardado con exito";
        }

        $retorno = json_encode(array("exito" => $exito, "mensaje" => $mensaje));

        return $retorno;
    }

    public static function TraerPuntajesUsuarios(): array
    {
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM puntajes"
        );
        $consulta->execute();

        $array_usuarios = array();
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $id = $fila["id"];
            $nombre = $fila["nombre"];
            $nivel = $fila["nivel"];
            $puntaje = $fila["puntaje"];
            $tiempo = $fila["tiempo"];
            $usuario = new Usuario($id, $nombre, $nivel, $puntaje, $tiempo);
            array_push($array_usuarios, $usuario);
        }

        return $array_usuarios;
    }

    public static function TraerPuntajeUsuario($id)
    {
        $usuario = null;
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM puntajes WHERE id = :id"
        );
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $id = $fila["id"];
            $nombre = $fila["nombre"];
            $nivel = $fila["nivel"];
            $puntaje = $fila["puntaje"];
            $tiempo = $fila["tiempo"];
            $usuario = new Usuario($id, $nombre, $nivel, $puntaje, $tiempo);
        }

        return $usuario;
    }

    public static function ModificarPuntajeUsuario(Usuario $usuarioMod): string
    {
        $exito = false;
        $mensaje = "No se pudo modificar el usuario";
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();

        $cadena =
            "UPDATE puntajes SET nombre = :nombre, nivel = :nivel, puntaje = :puntaje, 
        tiempo = :tiempo WHERE id = :id";
        $consulta = $accesoDatos->retornarConsulta($cadena);

        $consulta->bindValue(":id", $usuarioMod->id, PDO::PARAM_INT);
        $consulta->bindValue(":nombre", $usuarioMod->nombre, PDO::PARAM_STR);
        $consulta->bindValue(":nivel", $usuarioMod->nivel, PDO::PARAM_INT);
        $consulta->bindValue(":puntaje", $usuarioMod->puntaje, PDO::PARAM_INT);
        $consulta->bindValue(":tiempo", $usuarioMod->tiempo, PDO::PARAM_STR);
        $consulta->execute();

        $total_modificado = $consulta->rowCount();
        if ($total_modificado == 1) {
            $exito = true;
            $mensaje = "Usuario Modificado!";
        }

        $retorno = json_encode(array("exito" => $exito, "mensaje" => $mensaje));

        return $retorno;
    }

    public static function EliminarPuntajeUsuario($id)
    {
        $retorno = false;
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta("DELETE FROM puntajes WHERE id = :id");
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        $total_borrado = $consulta->rowCount();
        if ($total_borrado == 1) {
            $retorno = true;
        }

        return $retorno;
    }

    //##########################################################################
}
