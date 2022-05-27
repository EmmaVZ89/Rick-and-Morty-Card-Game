namespace Sonido {
  let sonidoCarta = new Audio();
  sonidoCarta.volume = 0.1;
  sonidoCarta.src = "./src/sonidos/carta.mp3";

  let sonidoExito = new Audio();
  sonidoExito.volume = 0.03;
  sonidoExito.src = "./src/sonidos/exito.mp3";

  let sonidoFalla = new Audio();
  sonidoFalla.volume = 0.01;
  sonidoFalla.src = "./src/sonidos/error.mp3";

  export function reproducirSonidoCarta(): void {
    sonidoCarta.pause();
    sonidoCarta.currentTime = 0;
    if (sonidoCarta.paused) {
      sonidoCarta.play();
    }
  }

  export function reproducirSonidoExito(): void {
    sonidoExito.pause();
    sonidoExito.currentTime = 0;
    if (sonidoExito.paused) {
      sonidoExito.play();
    }
  }

  export function reproducirSonidoFalla(): void {
    sonidoFalla.pause();
    sonidoFalla.currentTime = 0;
    if (sonidoFalla.paused) {
      sonidoFalla.play();
    }
  }
}
