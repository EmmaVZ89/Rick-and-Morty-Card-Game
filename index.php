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
    <title>Prueba API</title>
    <!-- <script src="./js/index.js" defer></script> -->
    <link href="./css/style.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
</head>

<body>
    <form action="" method="get">
        <input type="text" name="nombre" placeholder="Nombre" required>
        <input type="submit" value="Aceptar">
    </form>
    <br><br><br>
</body>

</html>

<?php
if (isset($_COOKIE["cookie_usuario"])) {
    session_start();
    $obj = json_decode($_COOKIE["cookie_usuario"]);
    $usuario = Usuario::TraerUsuarioJSON($obj->id);
    $_SESSION["usuario"] = isset($usuario) ? $usuario->ToJSON() : null;
    header("Location: game.php");
} else if (isset($_GET["nombre"])) {
    $nombre = isset($_GET["nombre"]) ? $_GET["nombre"] : null;
    if ($nombre) {
        $id = date("dmhis");
        $usuario = new Usuario($id, $nombre);
        setcookie("cookie_usuario", $usuario->ToJSON(), time() + 5184000, "/");
        session_start();
        $_SESSION["usuario"] = $_COOKIE["cookie_usuario"];
        header("Location: game.php");    
    }
}
?>