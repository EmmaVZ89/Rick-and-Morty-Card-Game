namespace Archivo {
  let xhttp: XMLHttpRequest = new XMLHttpRequest();

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
          }
        };
      }, 100);
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
      tabla += "<table class='tabla-puntajes'><thead id='tabla-thead'>";
      tabla += "<tr><th class='tabla-th'>Posición</th>";
      tabla += "<th class='tabla-th'>Nombre</th>";
      tabla += "<th class='tabla-th'>Puntaje</th>";
      tabla += "<th class='tabla-th'>Tiempo</th></tr>";
      tabla += "</thead>";
      tabla += "<tbody class='tabla-tbody'>";
      for (let i = 0; i < usuarios.length; i++) {
        const usuario: any = usuarios[i];
        tabla += `<tr class='tabla-tr' data-id='${usuario.id}'>`;
        tabla += `<td class='tabla-td'>${i + 1}</td>`;
        for (const key in usuario) {
          if (key == "nombre") {
            tabla += `<td class='tabla-td'>${usuario[key]}</td>`;
          } else if (key == "puntaje") {
            tabla += `<td class='tabla-td'>${usuario[key]}</td>`;
          } else if (key == "tiempo") {
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
}
