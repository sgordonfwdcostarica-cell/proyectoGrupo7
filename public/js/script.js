import { getAllData, patchData,deleteData } from "../services/fetch.js";



let contador = 3;

const tabla = document.getElementById("tablaUsuarios");

async function mostrarUsuarios() {
    const usuarios = await getAllData("users")



    tabla.innerHTML = "";

    usuarios.forEach(usuario => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        tdId.textContent = usuario.id;
        tr.appendChild(tdId);
        const tdNombre = document.createElement("td");
        const tdCorreo = document.createElement("td");
        const tdRol = document.createElement("td");
        const tdEstado = document.createElement("td");
        const tdAcciones = document.createElement("td");
        tdNombre.textContent = usuario.nombre;
        tdCorreo.textContent = usuario.correo;
        tdRol.textContent = usuario.rol;
        tdEstado.textContent = usuario.estado;

        const btnCambiarRol = document.createElement("button");
        btnCambiarRol.textContent = "Cambiar Rol";

        const btnCambiarEstado = document.createElement("button");
        btnCambiarEstado.textContent = "Activar/Desactivar";

        btnCambiarEstado.addEventListener("click", async () => {
            await cambiarEstado(usuario.id)
            mostrarUsuarios()
        })


        const btnEliminar = document.createElement("button");

        btnEliminar.addEventListener("click", async () => {
            await eliminarUsuario(usuario.id);
            mostrarUsuarios();
        });

        btnEliminar.textContent = "Eliminar";

        tdAcciones.appendChild(btnCambiarRol);
        tdAcciones.appendChild(btnCambiarEstado);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdCorreo);
        tr.appendChild(tdRol);
        tr.appendChild(tdEstado);
        tr.appendChild(tdAcciones);

        tabla.appendChild(tr);
    });
}


document.getElementById("formUsuario").addEventListener("submit", function (e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const rol = document.getElementById("rol").value;

    const nuevoUsuario = {

        id: contador++,
        nombre,
        correo,
        rol,
        activo: true

    };

    usuarios.push(nuevoUsuario);

    mostrarUsuarios();

    this.reset();

});

async function eliminarUsuario(id) { 
        // Aqui 
        await deleteData("users",id)

        

}

async function cambiarEstado(id) {
    const cambio = await patchData({ estado: "inactivo" }, "users", id)
    console.log(cambio);
}

function cambiarRol(id) { 

    const usuario = usuarios.find(u => u.id === id);

    usuario.activo = !usuario.activo;

    mostrarUsuarios();

}

mostrarUsuarios();