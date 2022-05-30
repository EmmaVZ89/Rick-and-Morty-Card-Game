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
    <script src="./js/Ajax.js" defer></script>
    <script src="./js/Cronometro.js" defer></script>
    <script src="./js/Sonido.js" defer></script>
    <script src="./js/Game.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/ventanaModal.css" rel="stylesheet">
    <link href="./css/ventanaModalPuntajes.css" rel="stylesheet">

</head>
<?php
session_start();
if (isset($_SESSION["usuario"])) {
    $obj = json_decode($_SESSION["usuario"]);
    $usuario = Usuario::TraerUsuarioJSON($obj->id, "./backend/archivos/usuarios.json");
    $_SESSION["usuario"] = isset($usuario) ? $usuario->ToJSON() : null;
} else {
    header("Location: index.php");
}
?>

<body">
    <header>
        <nav id="header-nav" class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 navbar-ul">
                        <li><img class="foto-usuario" src="./src/img/defaulUser.png" alt="foto de usuario"></li>
                        <li><?php echo $usuario->nombre; ?></li>
                        <li><button id="btn-puntajes" class="btn-puntajes">Ranking</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div>
            <h2 id="tiempoCronometro" class="cronometro">00:00.00</h2>
        </div>
        <input type="hidden" id="jsonUsuario" value='<?php echo $_SESSION["usuario"] ?>'>
        <div id="contenedor-carta" class="container contenedor-cartas">
            <?php
            $URL = "https://rickandmortyapi.com/api/character";
            $URL2 = "https://rickandmortyapi.com/api/character?page=2";
            $json = file_get_contents($URL);
            $datos = json_decode($json);
            $json2 = file_get_contents($URL2);
            $datos2 = json_decode($json2);

            $array_personajes1 = $datos->results;
            $array_personajes2 = $datos2->results;
            shuffle($array_personajes1);
            shuffle($array_personajes2);
            $array_personajes = array_merge($array_personajes1, $array_personajes2);
            shuffle($array_personajes);
            $array_10Personajes = array_slice($array_personajes, 0, 10);
            $array_10Personajes = array_merge($array_10Personajes, $array_10Personajes);


            $array_cartas = array();
            for ($i = 0; $i < count($array_10Personajes); $i++) {
                $id_personaje = $array_10Personajes[$i]->id;
                $img_personaje = "<img src='{$array_10Personajes[$i]->image}' alt='img'>";
                $nombre_personaje = $array_10Personajes[$i]->name;

                $carta = "";
                if ($i >= 0 && $i <= 9) {
                    $carta .= "<div class='col tarjeta' >";
                    $carta .= "<div class='face front' data-id='{$id_personaje}' name='cartaFrontA'>";
                    $carta .= "<img src='./src/img/front3.png' alt='img'>";
                    $carta .= "</div>";
                    $carta .= "<div class='face back'name='cartaBackA" . $id_personaje . "'>";
                    $carta .= $img_personaje;
                    $carta .= "<p>" . $nombre_personaje . "</p>";
                    $carta .= "</div>";
                    $carta .= "</div>";
                } else {
                    $carta .= "<div class='col tarjeta' >";
                    $carta .= "<div class='face front' data-id='{$id_personaje}' name='cartaFrontB'>";
                    $carta .= "<img src='./src/img/front3.png' alt='img'>";
                    $carta .= "</div>";
                    $carta .= "<div class='face back'name='cartaBackB" . $id_personaje . "'>";
                    $carta .= $img_personaje;
                    $carta .= "<p>" . $nombre_personaje . "</p>";
                    $carta .= "</div>";
                    $carta .= "</div>";
                }
                array_push($array_cartas, $carta);
            }

            shuffle($array_cartas);
            $rows = 0;
            for ($i = 0; $i < count($array_cartas); $i++) {
                if ($rows == 0) {
                    echo "<div class='row'>";
                }
                echo $array_cartas[$i];
                if ($rows == 4) {
                    echo "</div>";
                    $rows = 0;
                } else {
                    $rows++;
                }
            }
            ?>
        </div>
    </main>
    <footer>
        <div class="footer-link">
            <p>Creado por <a href="https://github.com/EmmaVZ89" target="_blank">Emmanuel Zelarayan</a> ©2022</p>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </body>

</html>