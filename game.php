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
    <!-- <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    /> -->
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/ventanaModal.css" rel="stylesheet">

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
<!-- <header id="header-nav">
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</header> -->

<body style="background-color: black;">
    <div>
        <h2 id="tiempoCronometro" class="cronometro">00:00.00</h2>
    </div>

    <?php
    echo "<h3 class='usuario'>Bienvenido " . $usuario->nombre . "</h3>";
    ?>
    <input type="hidden" id="jsonUsuario" value='<?php echo $_SESSION["usuario"] ?>'>
    <div class="container contenedor-cartas">
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
                $carta .= "<div class='tarjeta' >";
                $carta .= "<div class='face front' data-id='{$id_personaje}' name='cartaFrontA'>";
                $carta .= "<img src='./src/img/front.jpg' alt='img'>";
                $carta .= "</div>";
                $carta .= "<div class='face back'name='cartaBackA" . $id_personaje . "'>";
                $carta .= $img_personaje;
                $carta .= "<p>" . $nombre_personaje . "</p>";
                $carta .= "</div>";
                $carta .= "</div>";
            } else {
                $carta .= "<div class='tarjeta' >";
                $carta .= "<div class='face front' data-id='{$id_personaje}' name='cartaFrontB'>";
                $carta .= "<img src='./src/img/front.jpg' alt='img'>";
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
        for ($i = 0; $i < count($array_cartas); $i++) {
            echo $array_cartas[$i];
        }
        ?>
    </div>
    <div id="contenedorTablaPuntajes" class="tabla-puntajes"></div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</body>

</html>