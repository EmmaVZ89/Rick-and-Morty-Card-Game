<?php

namespace Zelarayan;

require_once("./Usuario.php");

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rick and Morty Card Game</title>
    <script src="./js/index.js" defer></script>
    <link href="./css/index.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
</head>

<body style="background-color: black">
    <img class="img-titulo" src="./src/img/titulo.png" alt="titulo">
    <div class="contenedor">
        <div class="contenedor-form">
            <form class="form" action="" method="get">
                <div class="form-floating mb-3 input-form input-nombre">
                    <input class="form-control" type="text" id="txtNombre" name="nombre" placeholder="Nombre" maxlength="10" required />
                    <label for="txtNombre">Ingrese su nombre </label>
                </div>
                <input class="btn btn-success btn-submit" type="submit" value="Aceptar">
            </form>
        </div>
    </div>
    <footer>
        <div class="footer-link">
            <p>Creado por <a href="https://github.com/EmmaVZ89" target="_blank">Emmanuel Zelarayan</a> ©2022</p>
        </div>
    </footer>
</body>
</html>

<?php
if (isset($_COOKIE["cookie_usuario"])) {
    session_start();
    $obj = json_decode($_COOKIE["cookie_usuario"]);
    $usuario = Usuario::TraerUsuarioJSON($obj->id, "./backend/archivos/usuarios.json");
    $_SESSION["usuario"] = isset($usuario) ? $usuario->ToJSON() : null;
    header("Location: game.php");
} else if (isset($_GET["nombre"])) {
    $nombre = isset($_GET["nombre"]) ? $_GET["nombre"] : null;
    if (strlen($nombre) <= 10) {
        $id = date("dmhis");
        $usuario = new Usuario($id, $nombre);
        setcookie("cookie_usuario", $usuario->ToJSON(), time() + 5184000, "/");
        $usuario->GuardarUsuario("./backend/archivos/usuarios.json");
        session_start();
        $_SESSION["usuario"] = $_COOKIE["cookie_usuario"];
        header("Location: game.php");
    }
}
?>