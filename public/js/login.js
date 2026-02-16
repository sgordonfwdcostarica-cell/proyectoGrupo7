const correo = document.getElementById("correo")
const contraseña = document.getElementById("contraseña")
const btnSesion = document.getElementById("btnSesion")

btnSesion.addEventListener("click", function () {

    const valorCorreo = correo.value
    const valorContraseña = contraseña.value

    // Validación básica
    if (valorCorreo === "" || valorContraseña === "") {
        alert("Por favor completa todos los campos")
        return
    }

    // Ejemplo de validación simple
    if (valorCorreo === "admin@gmail.com" && valorContraseña === "1234") {
        alert("Inicio de sesión exitoso")
        // aquí puedes redirigir
        // window.location.href = "home.html"
    } else {
        alert("Correo o contraseña incorrectos")
    }

})
