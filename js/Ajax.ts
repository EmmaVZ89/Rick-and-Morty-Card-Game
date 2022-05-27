namespace Archivo {
  export class Ajax {
    public static guardarUsuario(usuario: any): void {
      xhttp.open("POST", "./backend/GuardarUsuario.php", true);
      let form: FormData = new FormData();
      form.append("usuarioJson", JSON.stringify(usuario));
      xhttp.send(form);
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let respuesta: any = JSON.parse(xhttp.responseText);
          console.log(respuesta.mensaje);
        }
      };
    }

    public static guardarPuntaje(usuario: any): void {
      setTimeout(() => {
        xhttp.open("POST", "./backend/GuardarPuntajes.php", true);
        let form: FormData = new FormData();
        form.append("usuarioJson", JSON.stringify(usuario));
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let respuesta: any = JSON.parse(xhttp.responseText);
            console.log(respuesta.mensaje);
            Ajax.listarPuntajes();
          }
        };
      }, 10);
    }

    public static listarPuntajes(): void {
      xhttp.open("GET", "./backend/ListarPuntajes.php", true);
      xhttp.send();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let contenedorTabla: HTMLDivElement = <HTMLDivElement>(
            document.getElementById("contenedorTablaPuntajes")
          );
          let respuesta: string = xhttp.responseText;
          let usuarios: any = JSON.parse(respuesta);
          contenedorTabla.innerHTML = Ajax.dibujarTabla(usuarios);
        }
      };
    }

    private static dibujarTabla(usuarios: any): string {
      let tabla: string = "";
      tabla += "<table><thead>";
      tabla += "<th>N°</th>";
      tabla += "<th>Nombre</th>";
      tabla += "<th>Puntaje</th>";
      tabla += "<th>Tiempo</th>";
      tabla += "</thead>";
      tabla += "<tbody>";
      for (let i = 0; i < usuarios.length; i++) {
        const usuario: any = usuarios[i];
        tabla += "<tr>";
        tabla += `<td>${i + 1}</td>`;
        for (const key in usuario) {
          if (key == "nombre") {
            tabla += `<td>${usuario[key]}</td>`;
          } else if (key == "puntajes") {
            tabla += `<td>${usuario[key][0]}</td>`;
          } else if (key == "tiempos") {
            tabla += `<td>${usuario[key][0]}</td>`;
          }
        }
        tabla += "</tr>";
      }
      tabla += "</tbody></table>";

      return tabla;
    }
  }
}
