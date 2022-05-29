"use strict";
var Sonido;
(function (Sonido) {
    let sonidoCarta = new Audio();
    sonidoCarta.volume = 0.1;
    sonidoCarta.src = "./src/sonidos/carta.mp3";
    let sonidoExito = new Audio();
    sonidoExito.volume = 0.03;
    sonidoExito.src = "./src/sonidos/exito.mp3";
    let sonidoFalla = new Audio();
    sonidoFalla.volume = 0.01;
    sonidoFalla.src = "./src/sonidos/error.mp3";
    let sonidoRegresiva = new Audio();
    sonidoRegresiva.volume = 0.05;
    sonidoRegresiva.src = "./src/sonidos/pitido1.mp3";
    let sonidoRegresiva2 = new Audio();
    sonidoRegresiva2.volume = 0.05;
    sonidoRegresiva2.src = "./src/sonidos/pitido3.mp3";
    function reproducirSonidoCarta() {
        sonidoCarta.pause();
        sonidoCarta.currentTime = 0;
        if (sonidoCarta.paused) {
            sonidoCarta.play();
        }
    }
    Sonido.reproducirSonidoCarta = reproducirSonidoCarta;
    function reproducirSonidoExito() {
        sonidoExito.pause();
        sonidoExito.currentTime = 0;
        if (sonidoExito.paused) {
            sonidoExito.play();
        }
    }
    Sonido.reproducirSonidoExito = reproducirSonidoExito;
    function reproducirSonidoFalla() {
        sonidoFalla.pause();
        sonidoFalla.currentTime = 0;
        if (sonidoFalla.paused) {
            sonidoFalla.play();
        }
    }
    Sonido.reproducirSonidoFalla = reproducirSonidoFalla;
    function reproducirSonidoRegresiva() {
        sonidoRegresiva.pause();
        sonidoRegresiva.currentTime = 0;
        if (sonidoRegresiva.paused) {
            sonidoRegresiva.play();
        }
    }
    Sonido.reproducirSonidoRegresiva = reproducirSonidoRegresiva;
    function reproducirSonidoRegresiva2() {
        sonidoRegresiva2.pause();
        sonidoRegresiva2.currentTime = 0;
        if (sonidoRegresiva2.paused) {
            sonidoRegresiva2.play();
        }
    }
    Sonido.reproducirSonidoRegresiva2 = reproducirSonidoRegresiva2;
})(Sonido || (Sonido = {}));
//# sourceMappingURL=Sonido.js.map