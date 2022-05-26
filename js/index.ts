let idA = 0;
let idB = -1;
let flag = 0;
let idTimeA: number | undefined;
let idTimeB: number | undefined;
let aux_cartaFrontA: any;
let aux_cartaBackA: any;
let aux_cartaFrontB: any;
let aux_cartaBackB: any;

let tiempo1 = 2500;
let tiempo2: any;
let fecha: any;
let fecha2: any;
let intervalo1: any;
let intervalo2: any;
let intervaloFinal: any;

let sonidoCarta = new Audio();
sonidoCarta.volume = 0.1;
sonidoCarta.src = "carta2.mp3";

let sonidoExito = new Audio();
sonidoExito.volume = 0.03;
sonidoExito.src = "exito.mp3";

let sonidoFalla = new Audio();
sonidoFalla.volume = 0.01;
sonidoFalla.src = "error.mp3";

let inputJson = <HTMLInputElement> document.getElementById("jsonUsuario");
let usuarioJson = JSON.parse(inputJson.value);
let xhttp: XMLHttpRequest = new XMLHttpRequest();

let tiempoNivel: any;
let cartasNivel: number = 0;
let puntuacionNivel: number = 0;
let plusPuntuacion: number = 1;
let idInterval: any;
//##################################################################
document.addEventListener("DOMContentLoaded", () => {
  const $tiempoTranscurrido: Element | null = document.querySelector("#tiempoCronometro");

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

  function iniciar() {
    const ahora = new Date();
    tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
    clearInterval(idInterval);
    idInterval = setInterval(refrescarTiempo, 25);
  }

  function refrescarTiempo() {
    const ahora = new Date();
    const diferencia = ahora.getTime() - tiempoInicio.getTime();
    if ($tiempoTranscurrido) {
      $tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
      tiempoNivel = $tiempoTranscurrido.textContent;
    }
  }
  iniciar();
});
//##################################################################

document.getElementsByName("cartaFrontA").forEach((cartaFront) => {
  cartaFront.addEventListener("click", () => {
    if (flag < 2) {
      sonidoCarta.pause();
      sonidoCarta.currentTime = 0;
      if (sonidoCarta.paused) {
        sonidoCarta.play();
      }
      flag++;

      if (flag == 1) {
        fecha = new Date();
        intervalo1 = fecha.getTime();
      } else if (flag == 2) {
        fecha2 = new Date();
        intervalo2 = fecha2.getTime();
        intervaloFinal = intervalo2 - intervalo1;
        tiempo2 = tiempo1 - intervaloFinal;
      }

      let idCarta: any = cartaFront.getAttribute("data-id");
      let id: number = parseInt(idCarta);

      idA = id;
      cartaFront.style.transform = "perspective(600px) rotateY(180deg)";

      const cartaBackA = document.getElementsByName("cartaBackA" + idCarta);
      cartaBackA[0].style.transform = "perspective(600px) rotateY(360deg)";
      aux_cartaFrontA = cartaFront;
      aux_cartaBackA = cartaBackA;

      if (flag == 1) {
        idTimeA = setTimeout(() => {
          if (idA != idB) {
            if (aux_cartaFrontB == undefined && aux_cartaBackB == undefined) {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
            } else {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontB.style.transform = "perspective(600px) rotateY(0deg)";
              aux_cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontB = undefined;
              aux_cartaBackB = undefined;
            }
          }

          idA = 0;
          idB = -1;
          flag--;
          plusPuntuacion = 1;
          if (flag < 0) {
            flag = 0;
          }
        }, tiempo1);
      } else if (flag == 2) {
        idTimeA = setTimeout(() => {
          if (idA != idB) {
            if (aux_cartaFrontB == undefined && aux_cartaBackB == undefined) {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
            } else {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontB.style.transform = "perspective(600px) rotateY(0deg)";
              aux_cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontB = undefined;
              aux_cartaBackB = undefined;
            }
          }

          idA = 0;
          idB = -1;
          flag--;
          plusPuntuacion = 1;
          if (flag < 0) {
            flag = 0;
          }
        }, tiempo2);
      }

      if (idA == idB) {
        cartasNivel++;
        sonidoExito.pause();
        sonidoExito.currentTime = 0;
        if (sonidoExito.paused) {
          sonidoExito.play();
        }

        if (plusPuntuacion == 1) {
          puntuacionNivel += 100;
          plusPuntuacion++;
        } else if (plusPuntuacion == 2) {
          puntuacionNivel += 100 * 1.1;
          plusPuntuacion++;
        } else if (plusPuntuacion == 3) {
          puntuacionNivel += 100 * 1.15;
          plusPuntuacion++;
        } else {
          puntuacionNivel += 100 * 1.3;
        }

        clearTimeout(idTimeA);
        clearTimeout(idTimeB);
        aux_cartaFrontA = undefined;
        aux_cartaBackA = undefined;
        aux_cartaFrontB = undefined;
        aux_cartaBackB = undefined;
        flag = 0;
        idA = 0;

        if (cartasNivel == 10) {
          clearInterval(idInterval);
          usuarioJson.puntajes[0] = puntuacionNivel;
          usuarioJson.tiempos[0] = tiempoNivel;
          guardarUsuario(usuarioJson);
        }
      } else {
        if (flag == 2) {
          sonidoFalla.pause();
          sonidoFalla.currentTime = 0;
          if (sonidoFalla.paused) {
            sonidoFalla.play();
          }
        }
      }
    }
  });
});

document.getElementsByName("cartaFrontB").forEach((cartaFront) => {
  cartaFront.addEventListener("click", () => {
    if (flag < 2) {
      sonidoCarta.pause();
      sonidoCarta.currentTime = 0;
      if (sonidoCarta.paused) {
        sonidoCarta.play();
      }
      flag++;

      if (flag == 1) {
        fecha = new Date();
        intervalo1 = fecha.getTime();
      } else if (flag == 2) {
        fecha2 = new Date();
        intervalo2 = fecha2.getTime();
        intervaloFinal = intervalo2 - intervalo1;
        tiempo2 = tiempo1 - intervaloFinal;
      }

      let idCarta: any = cartaFront.getAttribute("data-id");
      let id: number = parseInt(idCarta);
      idB = id;
      cartaFront.style.transform = "perspective(600px) rotateY(180deg)";
      const cartaBackB = document.getElementsByName("cartaBackB" + idCarta);
      cartaBackB[0].style.transform = "perspective(600px) rotateY(360deg)";
      aux_cartaFrontB = cartaFront;
      aux_cartaBackB = cartaBackB;

      if (flag == 1) {
        idTimeB = setTimeout(() => {
          if (idA != idB) {
            if (aux_cartaFrontA == undefined && aux_cartaBackA == undefined) {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
            } else {
              aux_cartaFrontA.style.transform = "perspective(600px) rotateY(0deg)";
              aux_cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontA = undefined;
              aux_cartaBackA = undefined;
            }
          }
          idA = 0;
          idB = -1;
          flag--;
          plusPuntuacion = 1;
          if (flag < 0) {
            flag = 0;
          }
        }, tiempo1);
      } else if (flag == 2) {
        idTimeB = setTimeout(() => {
          if (idA != idB) {
            if (aux_cartaFrontA == undefined && aux_cartaBackA == undefined) {
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
            } else {
              aux_cartaFrontA.style.transform = "perspective(600px) rotateY(0deg)";
              aux_cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
              cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
              cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
              aux_cartaFrontA = undefined;
              aux_cartaBackA = undefined;
            }
          }
          idA = 0;
          idB = -1;
          flag--;
          plusPuntuacion = 1;
          if (flag < 0) {
            flag = 0;
          }
        }, tiempo2);
      }

      if (idA == idB) {
        cartasNivel++;
        sonidoExito.pause();
        sonidoExito.currentTime = 0;
        if (sonidoExito.paused) {
          sonidoExito.play();
        }

        if (plusPuntuacion == 1) {
          puntuacionNivel += 100;
          plusPuntuacion++;
        } else if (plusPuntuacion == 2) {
          puntuacionNivel += 100 * 1.1;
          plusPuntuacion++;
        } else if (plusPuntuacion == 3) {
          puntuacionNivel += 100 * 1.15;
          plusPuntuacion++;
        } else {
          puntuacionNivel += 100 * 1.3;
        }

        clearTimeout(idTimeA);
        clearTimeout(idTimeB);
        aux_cartaFrontA = undefined;
        aux_cartaBackA = undefined;
        aux_cartaFrontB = undefined;
        aux_cartaBackB = undefined;
        flag = 0;
        idB = -1;

        if (cartasNivel == 10) {
          clearInterval(idInterval);
          usuarioJson.puntajes[0] = puntuacionNivel;
          usuarioJson.tiempos[0] = tiempoNivel;
          guardarUsuario(usuarioJson);
        }
      } else {
        if (flag == 2) {
          sonidoFalla.pause();
          sonidoFalla.currentTime = 0;
          if (sonidoFalla.paused) {
            sonidoFalla.play();
          }
        }
      }
    }
  });
});

// FUNCIONES AJAX
// ###################################################################################################
// ###################################################################################################
function guardarUsuario(usuario: any) {
  xhttp.open("POST", "./backend/GuardarUsuario.php", true);
  let form: FormData = new FormData();
  form.append("usuarioJson", JSON.stringify(usuario));
  xhttp.send(form);
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // let contenedor = document.getElementById("respuesta");
      let respuesta = JSON.parse(xhttp.responseText);
      console.log(respuesta.mensaje);
    }
  };
}
// ###################################################################################################
// ###################################################################################################
