"use strict";
/// <reference path="./Ajax.ts" />
/// <reference path="./Cronometro.ts" />
/// <reference path="./Sonido.ts" />
// VARIABLES PARA LA LOGICA DE CARTAR
let idA = 0;
let idB = -1;
let flag = 0;
let idTimeA;
let idTimeB;
let aux_cartaFrontA;
let aux_cartaBackA;
let aux_cartaFrontB;
let aux_cartaBackB;
// VARIABLES PARA CALCULAR LOS INTERVALOS DE LAS CARTAS
let tiempo1 = 2500;
let tiempo2;
let fecha;
let fecha2;
let intervalo1;
let intervalo2;
let intervaloFinal;
// USUARIO QUE VIENE EN EL ARCHIVO HTML
let inputJson = document.getElementById("jsonUsuario");
let usuarioJson = JSON.parse(inputJson.value);
// VARIABLES PARA CARCULAR ACIERTOS, PUNTAJES Y GUARDAR LAS VICTORIAS
let tiempoNivel;
let cartasNivel = 0;
let aciertos = 10;
let puntuacionNivel = 0;
let plusPuntuacion = 1;
let idInterval;
const contenedorCronometro = document.querySelector("#tiempoCronometro");
// contenedorCronometro.textContent = "00:00.00";
// MUESTRO LA TABLA DE PUNTAJES INICIAL
Archivo.Ajax.listarPuntajes();
// INICIO DEL CRONOMETRO
// document.addEventListener("DOMContentLoaded", () => {
//   idInterval = Cronometro.iniciar();
// });
//########################################################################################################################
// EVENTO CARTAS TIPO A
//########################################################################################################################
document.getElementsByName("cartaFrontA").forEach((cartaFront) => {
    cartaFront.addEventListener("click", () => {
        if (flag < 2) {
            flag++;
            idA = parseInt(cartaFront.getAttribute("data-id"));
            Sonido.reproducirSonidoCarta();
            calcularIntervalos();
            let cartaBackA = document.getElementsByName("cartaBackA" + idA)[0];
            cartaFront.style.transform = "perspective(600px) rotateY(180deg)";
            cartaBackA.style.transform = "perspective(600px) rotateY(360deg)";
            aux_cartaFrontA = cartaFront;
            aux_cartaBackA = cartaBackA;
            if (flag == 1) {
                idTimeA = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontB == undefined && aux_cartaBackB == undefined) {
                            voltearCartasFront([cartaFront]);
                            voltearCartasBack([cartaBackA]);
                        }
                        else {
                            voltearCartasFront([cartaFront, aux_cartaFrontB]);
                            voltearCartasBack([cartaBackA, aux_cartaBackB]);
                            resetearContenedoresAuxB();
                        }
                    }
                    resetearValores();
                }, tiempo1);
            }
            else if (flag == 2) {
                idTimeA = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontB == undefined && aux_cartaBackB == undefined) {
                            voltearCartasFront([cartaFront]);
                            voltearCartasBack([cartaBackA]);
                        }
                        else {
                            voltearCartasFront([cartaFront, aux_cartaFrontB]);
                            voltearCartasBack([cartaBackA, aux_cartaBackB]);
                            resetearContenedoresAuxB();
                        }
                    }
                    resetearValores();
                }, tiempo2);
            }
            if (idA == idB) {
                cartasNivel++;
                Sonido.reproducirSonidoExito();
                calcularPuntuacion();
                clearTimeout(idTimeA);
                clearTimeout(idTimeB);
                resetearContenedoresAuxA();
                resetearContenedoresAuxB();
                flag = 0;
                idA = 0;
                if (cartasNivel == aciertos) {
                    terminarNivel();
                }
            }
            else {
                if (flag == 2) {
                    Sonido.reproducirSonidoFalla();
                }
            }
        }
    });
});
//########################################################################################################################
// EVENTO CARTAS TIPO B
//########################################################################################################################
document.getElementsByName("cartaFrontB").forEach((cartaFront) => {
    cartaFront.addEventListener("click", () => {
        if (flag < 2) {
            flag++;
            idB = parseInt(cartaFront.getAttribute("data-id"));
            Sonido.reproducirSonidoCarta();
            calcularIntervalos();
            let cartaBackB = document.getElementsByName("cartaBackB" + idB)[0];
            cartaFront.style.transform = "perspective(600px) rotateY(180deg)";
            cartaBackB.style.transform = "perspective(600px) rotateY(360deg)";
            aux_cartaFrontB = cartaFront;
            aux_cartaBackB = cartaBackB;
            if (flag == 1) {
                idTimeB = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontA == undefined && aux_cartaBackA == undefined) {
                            voltearCartasFront([cartaFront]);
                            voltearCartasBack([cartaBackB]);
                        }
                        else {
                            voltearCartasFront([cartaFront, aux_cartaFrontA]);
                            voltearCartasBack([cartaBackB, aux_cartaBackA]);
                            resetearContenedoresAuxA();
                        }
                    }
                    resetearValores();
                }, tiempo1);
            }
            else if (flag == 2) {
                idTimeB = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontA == undefined && aux_cartaBackA == undefined) {
                            voltearCartasFront([cartaFront]);
                            voltearCartasBack([cartaBackB]);
                        }
                        else {
                            voltearCartasFront([cartaFront, aux_cartaFrontA]);
                            voltearCartasBack([cartaBackB, aux_cartaBackA]);
                            resetearContenedoresAuxA();
                        }
                    }
                    resetearValores();
                }, tiempo2);
            }
            if (idA == idB) {
                cartasNivel++;
                Sonido.reproducirSonidoExito();
                calcularPuntuacion();
                clearTimeout(idTimeA);
                clearTimeout(idTimeB);
                resetearContenedoresAuxA();
                resetearContenedoresAuxB();
                flag = 0;
                idB = -1;
                if (cartasNivel == aciertos) {
                    terminarNivel();
                }
            }
            else {
                if (flag == 2) {
                    Sonido.reproducirSonidoFalla();
                }
            }
        }
    });
});
// FUNCIONES PARA LOS EVENTOS DE LAS CARTAS A Y B
//########################################################################################################################
//########################################################################################################################
//########################################################################################################################
function calcularPuntuacion() {
    if (plusPuntuacion == 1) {
        puntuacionNivel += 100;
        plusPuntuacion++;
    }
    else if (plusPuntuacion == 2) {
        puntuacionNivel += 100 * 1.1;
        plusPuntuacion++;
    }
    else if (plusPuntuacion == 3) {
        puntuacionNivel += 100 * 1.15;
        plusPuntuacion++;
    }
    else {
        puntuacionNivel += 100 * 1.3;
    }
}
function calcularIntervalos() {
    if (flag == 1) {
        fecha = new Date();
        intervalo1 = fecha.getTime();
    }
    else if (flag == 2) {
        fecha2 = new Date();
        intervalo2 = fecha2.getTime();
        intervaloFinal = intervalo2 - intervalo1;
        tiempo2 = tiempo1 - intervaloFinal;
    }
}
function terminarNivel() {
    clearInterval(idInterval);
    tiempoNivel = contenedorCronometro.textContent;
    usuarioJson.puntajes[0] = puntuacionNivel;
    usuarioJson.tiempos[0] = tiempoNivel;
    Archivo.Ajax.guardarUsuario(usuarioJson);
    Archivo.Ajax.guardarPuntaje(usuarioJson);
}
function voltearCartasFront([...contenedor]) {
    for (let i = 0; i < contenedor.length; i++) {
        contenedor[i].style.transform = "perspective(600px) rotateY(0deg)";
    }
}
function voltearCartasBack([...contenedor]) {
    for (let i = 0; i < contenedor.length; i++) {
        contenedor[i].style.transform = "perspective(600px) rotateY(180deg)";
    }
}
function resetearValores() {
    idA = 0;
    idB = -1;
    flag--;
    plusPuntuacion = 1;
    if (flag < 0) {
        flag = 0;
    }
}
function resetearContenedoresAuxA() {
    aux_cartaFrontA = undefined;
    aux_cartaBackA = undefined;
}
function resetearContenedoresAuxB() {
    aux_cartaFrontB = undefined;
    aux_cartaBackB = undefined;
}
// FUNCIONES PARA CREAR UNA VENTANA MODAL
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
let modalContent;
let modalContainer;
dibujarModal(armarVentandaModal());
let btnComenzar = document.getElementById("btn-comenzar");
btnComenzar.addEventListener("click", (e) => {
    let numero = 3;
    let idInt;
    btnComenzar.innerText = numero.toString();
    idInt = setInterval(() => {
        numero--;
        btnComenzar.innerText = numero.toString();
        if (numero === 0) {
            clearInterval(idInt);
            idInterval = Cronometro.iniciar();
            if (e.target === btnComenzar) {
                removerModal(modalContainer);
            }
        }
    }, 1000);
});
function dibujarModal(content) {
    modalContent = createCustomElement("div", {
        id: "contenido-modal",
        class: "contenido-modal",
    }, [content]);
    modalContainer = createCustomElement("div", {
        id: "contenedor-modal",
        class: "contenedor-modal",
    }, [modalContent]);
    // imprimimos el modal
    document.body.appendChild(modalContainer);
}
function removerModal(contenedor) {
    document.body.removeChild(contenedor);
}
function armarVentandaModal() {
    let ventana = "";
    ventana += `<h2 class="usuario-bienvenida">! Bienvenido/a ${usuarioJson.nombre} !</h2>`;
    ventana += `<button id="btn-comenzar">Comenzar</button>`;
    return ventana;
}
function createCustomElement(element, attibutes, children) {
    let customElement = document.createElement(element);
    if (children !== undefined)
        children.forEach((el) => {
            if (el.nodeType) {
                if (el.nodeType === 1 || el.nodeType === 11)
                    customElement.appendChild(el);
            }
            else {
                customElement.innerHTML += el;
            }
        });
    addAttributes(customElement, attibutes);
    return customElement;
}
function addAttributes(element, attrObj) {
    for (let attr in attrObj) {
        if (attrObj.hasOwnProperty(attr))
            element.setAttribute(attr, attrObj[attr]);
    }
}
//# sourceMappingURL=Game.js.map