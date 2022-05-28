let sonidoIndex = new Audio();
sonidoIndex.volume = 0.1;
sonidoIndex.src = "./src/sonidos/temaIndex.mp3";

let input = document.getElementById("txtNombre");
input?.addEventListener("click", () => {
  sonidoIndex.play();
});
