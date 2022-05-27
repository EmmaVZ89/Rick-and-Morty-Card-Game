namespace Cronometro {
    const $tiempoTranscurrido = <HTMLDivElement>document.querySelector("#tiempoCronometro");
    let diferenciaTemporal = 0;
    let tiempoInicio: any;
    let segundos: any;
  
    function agregarCeroSiEsNecesario(valor: any) {
      if (valor < 10) {
        return "0" + valor;
      } else {
        return "" + valor;
      }
    }
  
    function milisegundosAMinutosYSegundos(milisegundos: any) {
      const minutos = parseInt(milisegundos / 1000 / 60);
      milisegundos -= minutos * 60 * 1000;
      segundos = milisegundos / 1000;
      return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(2))}`;
    }
  
    export function iniciar() {
      const ahora = new Date();
      tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
      clearInterval(idInterval);
      idInterval = setInterval(refrescarTiempo, 25);
      return idInterval;
    }
  
    function refrescarTiempo() {
      const ahora = new Date();
      const diferencia = ahora.getTime() - tiempoInicio.getTime();
      if ($tiempoTranscurrido) {
        $tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
      }
    }

  }
