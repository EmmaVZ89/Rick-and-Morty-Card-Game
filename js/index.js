"use strict";
let idA = 0;
let idB = -1;
let flag = 0;
let idTimeA;
let idTimeB;
let aux_cartaFrontA;
let aux_cartaBackA;
let aux_cartaFrontB;
let aux_cartaBackB;
let tiempo1 = 2500;
let tiempo2;
let fecha;
let fecha2;
let intervalo1;
let intervalo2;
let intervaloFinal;
let sonidoCarta = new Audio();
sonidoCarta.volume = 0.1;
sonidoCarta.src = "carta2.mp3";
let sonidoExito = new Audio();
sonidoExito.volume = 0.03;
sonidoExito.src = "exito.mp3";
let sonidoFalla = new Audio();
sonidoFalla.volume = 0.0095;
sonidoFalla.src = "error.mp3";
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
            }
            else if (flag == 2) {
                fecha2 = new Date();
                intervalo2 = fecha2.getTime();
                intervaloFinal = intervalo2 - intervalo1;
                tiempo2 = tiempo1 - intervaloFinal;
            }
            let idCarta = cartaFront.getAttribute("data-id");
            let id = parseInt(idCarta);
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
                        }
                        else {
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
                    if (flag < 0) {
                        flag = 0;
                    }
                }, tiempo1);
            }
            else if (flag == 2) {
                idTimeA = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontB == undefined && aux_cartaBackB == undefined) {
                            cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
                            cartaBackA[0].style.transform = "perspective(600px) rotateY(180deg)";
                        }
                        else {
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
                    if (flag < 0) {
                        flag = 0;
                    }
                }, tiempo2);
            }
            if (idA == idB) {
                sonidoExito.pause();
                sonidoExito.currentTime = 0;
                if (sonidoExito.paused) {
                    sonidoExito.play();
                }
                clearTimeout(idTimeA);
                clearTimeout(idTimeB);
                aux_cartaFrontA = undefined;
                aux_cartaBackA = undefined;
                aux_cartaFrontB = undefined;
                aux_cartaBackB = undefined;
                flag = 0;
                idA = 0;
            }
            else {
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
            }
            else if (flag == 2) {
                fecha2 = new Date();
                intervalo2 = fecha2.getTime();
                intervaloFinal = intervalo2 - intervalo1;
                tiempo2 = tiempo1 - intervaloFinal;
            }
            let idCarta = cartaFront.getAttribute("data-id");
            let id = parseInt(idCarta);
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
                        }
                        else {
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
                    if (flag < 0) {
                        flag = 0;
                    }
                }, tiempo1);
            }
            else if (flag == 2) {
                idTimeB = setTimeout(() => {
                    if (idA != idB) {
                        if (aux_cartaFrontA == undefined && aux_cartaBackA == undefined) {
                            cartaFront.style.transform = "perspective(600px) rotateY(0deg)";
                            cartaBackB[0].style.transform = "perspective(600px) rotateY(180deg)";
                        }
                        else {
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
                    if (flag < 0) {
                        flag = 0;
                    }
                }, tiempo2);
            }
            if (idA == idB) {
                sonidoExito.pause();
                sonidoExito.currentTime = 0;
                if (sonidoExito.paused) {
                    sonidoExito.play();
                }
                clearTimeout(idTimeA);
                clearTimeout(idTimeB);
                aux_cartaFrontA = undefined;
                aux_cartaBackA = undefined;
                aux_cartaFrontB = undefined;
                aux_cartaBackB = undefined;
                flag = 0;
                idB = -1;
            }
            else {
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
//# sourceMappingURL=index.js.map