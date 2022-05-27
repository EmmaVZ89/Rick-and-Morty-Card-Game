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
})(Sonido || (Sonido = {}));
//# sourceMappingURL=Sonido.js.map