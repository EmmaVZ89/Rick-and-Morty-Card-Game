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

  let sonidoRegresiva = new Audio();
  sonidoRegresiva.volume = 0.05;
  sonidoRegresiva.src = "./src/sonidos/pitido1.mp3";

  let sonidoRegresiva2 = new Audio();
  sonidoRegresiva2.volume = 0.05;
  sonidoRegresiva2.src = "./src/sonidos/pitido3.mp3";

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

  export function reproducirSonidoRegresiva(): void {
    sonidoRegresiva.pause();
    sonidoRegresiva.currentTime = 0;
    if (sonidoRegresiva.paused) {
      sonidoRegresiva.play();
    }
  }

  export function reproducirSonidoRegresiva2(): void {
    sonidoRegresiva2.pause();
    sonidoRegresiva2.currentTime = 0;
    if (sonidoRegresiva2.paused) {
      sonidoRegresiva2.play();
    }
  }
}
