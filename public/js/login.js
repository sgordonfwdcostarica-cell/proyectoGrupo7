import { getUsuarios } from "../services/fetch.js"

const correo = document.getElementById("email")
const contraseña = document.getElementById("password")
const btnSesion = document.getElementById("btnSesion")

btnSesion.addEventListener("click", async function (e) {
    e.preventDefault()
    const usuarios = await getUsuarios()



    const valorCorreo = correo.value
    const valorContraseña = contraseña.value

    // Validación básica
    if (valorCorreo === "" || valorContraseña === "") {
        alert("Por favor completa todos los campos")
        return
    }

    const usuarioValido = usuarios.find((usuario)=> usuario.correo === valorCorreo && usuario.contrasena === valorContraseña)


    if (usuarioValido) {
        window.location.href = "/pages/dashboard.html"
        localStorage.setItem("usuario", JSON.stringify(usuarioValido)) // Guarda el usuario que inicia sesion
    }else{
        alert("NO inicia sesion")
    }


})