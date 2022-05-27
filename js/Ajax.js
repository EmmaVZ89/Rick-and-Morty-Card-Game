"use strict";
var Archivo;
(function (Archivo) {
    let xhttp = new XMLHttpRequest();
    class Ajax {
        static guardarUsuario(usuario) {
            xhttp.open("POST", "./backend/GuardarUsuario.php", true);
            let form = new FormData();
            form.append("usuarioJson", JSON.stringify(usuario));
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let respuesta = JSON.parse(xhttp.responseText);
                    console.log(respuesta.mensaje);
                }
            };
        }
        static guardarPuntaje(usuario) {
            setTimeout(() => {
                xhttp.open("POST", "./backend/GuardarPuntajes.php", true);
                let form = new FormData();
                form.append("usuarioJson", JSON.stringify(usuario));
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let respuesta = JSON.parse(xhttp.responseText);
                        console.log(respuesta.mensaje);
                        Ajax.listarPuntajes();
                    }
                };
            }, 10);
        }
        static listarPuntajes() {
            xhttp.open("GET", "./backend/ListarPuntajes.php", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let contenedorTabla = (document.getElementById("contenedorTablaPuntajes"));
                    let respuesta = xhttp.responseText;
                    let usuarios = JSON.parse(respuesta);
                    contenedorTabla.innerHTML = Ajax.dibujarTabla(usuarios);
                }
            };
        }
        static dibujarTabla(usuarios) {
            let tabla = "";
            tabla += "<table><thead>";
            tabla += "<th>N°</th>";
            tabla += "<th>Nombre</th>";
            tabla += "<th>Puntaje</th>";
            tabla += "<th>Tiempo</th>";
            tabla += "</thead>";
            tabla += "<tbody>";
            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                tabla += "<tr>";
                tabla += `<td>${i + 1}</td>`;
                for (const key in usuario) {
                    if (key == "nombre") {
                        tabla += `<td>${usuario[key]}</td>`;
                    }
                    else if (key == "puntajes") {
                        tabla += `<td>${usuario[key][0]}</td>`;
                    }
                    else if (key == "tiempos") {
                        tabla += `<td>${usuario[key][0]}</td>`;
                    }
                }
                tabla += "</tr>";
            }
            tabla += "</tbody></table>";
            return tabla;
        }
    }
    Archivo.Ajax = Ajax;
})(Archivo || (Archivo = {}));
//# sourceMappingURL=Ajax.js.map