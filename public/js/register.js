import { postData } from '../services/fetch.js';

const formRegister = document.getElementById('form-register');
const mensajeRespuesta = document.getElementById('mensaje-respuesta');

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validación básica (aunque los campos tienen "required" en HTML)
    if (!nombre || !correo || !contrasena || !telefono) {
        mostrarMensaje('Todos los campos son obligatorios.', 'error');
        return;
    }

    const nuevoUsuario = {
        nombre,
        correo,
        contrasena,
        telefono,
        rol: 'ciudadano' // Por defecto
    };

    try {
        const resultado = await postData('/users', nuevoUsuario);
        if (resultado) {
            mostrarMensaje('Registro exitoso. ¡Bienvenido!', 'success');
            formRegister.reset();
        }
    } catch (error) {
        mostrarMensaje('Hubo un error al registrar el usuario. Inténtelo de nuevo.', 'error');
    }
});

function mostrarMensaje(mensaje, tipo) {
    mensajeRespuesta.textContent = mensaje;
    mensajeRespuesta.style.color = tipo === 'success' ? '#27ae60' : '#e74c3c';
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
        mensajeRespuesta.textContent = '';
    }, 5000);
}
