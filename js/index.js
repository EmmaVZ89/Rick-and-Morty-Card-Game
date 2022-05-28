"use strict";
let sonidoIndex = new Audio();
sonidoIndex.volume = 0.1;
sonidoIndex.src = "./src/sonidos/temaIndex.mp3";
let input = document.getElementById("txtNombre");
input === null || input === void 0 ? void 0 : input.addEventListener("click", () => {
    sonidoIndex.play();
});
//# sourceMappingURL=index.js.map