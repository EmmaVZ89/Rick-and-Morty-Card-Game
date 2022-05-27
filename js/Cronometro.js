"use strict";
var Cronometro;
(function (Cronometro) {
    const $tiempoTranscurrido = document.querySelector("#tiempoCronometro");
    let diferenciaTemporal = 0;
    let tiempoInicio;
    let segundos;
    function agregarCeroSiEsNecesario(valor) {
        if (valor < 10) {
            return "0" + valor;
        }
        else {
            return "" + valor;
        }
    }
    function milisegundosAMinutosYSegundos(milisegundos) {
        const minutos = parseInt(milisegundos / 1000 / 60);
        milisegundos -= minutos * 60 * 1000;
        segundos = milisegundos / 1000;
        return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(2))}`;
    }
    function iniciar() {
        const ahora = new Date();
        tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
        clearInterval(idInterval);
        idInterval = setInterval(refrescarTiempo, 25);
        return idInterval;
    }
    Cronometro.iniciar = iniciar;
    function refrescarTiempo() {
        const ahora = new Date();
        const diferencia = ahora.getTime() - tiempoInicio.getTime();
        if ($tiempoTranscurrido) {
            $tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
        }
    }
})(Cronometro || (Cronometro = {}));
//# sourceMappingURL=Cronometro.js.map