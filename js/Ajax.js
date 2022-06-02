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
                    }
                };
            }, 100);
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
            tabla += "<table class='tabla-puntajes'><thead id='tabla-thead'>";
            tabla += "<tr><th class='tabla-th'>Posición</th>";
            tabla += "<th class='tabla-th'>Nombre</th>";
            tabla += "<th class='tabla-th'>Puntaje</th>";
            tabla += "<th class='tabla-th'>Tiempo</th></tr>";
            tabla += "</thead>";
            tabla += "<tbody class='tabla-tbody'>";
            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                tabla += `<tr class='tabla-tr' data-id='${usuario.id}'>`;
                tabla += `<td class='tabla-td'>${i + 1}</td>`;
                for (const key in usuario) {
                    if (key == "nombre") {
                        tabla += `<td class='tabla-td'>${usuario[key]}</td>`;
                    }
                    else if (key == "puntaje") {
                        tabla += `<td class='tabla-td'>${usuario[key]}</td>`;
                    }
                    else if (key == "tiempo") {
                        tabla += `<td class='tabla-td'>${usuario[key]}</td>`;
                    }
                }
                tabla += "</tr>";
                if (i === 9) {
                    break;
                }
            }
            tabla += "</tbody></table>";
            return tabla;
        }
    }
    Archivo.Ajax = Ajax;
})(Archivo || (Archivo = {}));
//# sourceMappingURL=Ajax.js.map