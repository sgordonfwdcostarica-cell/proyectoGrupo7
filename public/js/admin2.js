import { obtenerServicios,crearServicio,actualizarServicio,eliminarServicio } from './api.js';

const listado = document.getElementById('listaServicios');
const formulario = document.getElementById('formServicio');
const ventanModal = document.getElementById('modalServicio');
const botonNuevo = document.getElementById('btnCrearNuevo');
const botonCerrar = document.getElementById('btnCerrar');
const tituloModal = document.getElementById('tituloModal');


let listaDeServicios = [];


async function cargarYMostrar() {
    listaDeServicios = await obtenerServicios();
    listado.innerHTML = ''; 

    listaDeServicios.forEach(servicio => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        tarjeta.innerHTML = `
            <h3>${servicio.tipo}</h3>
            <p><strong>Descripción:</strong> ${servicio.descripcion}</p>
            <p><strong>Responsable:</strong> ${servicio.responsable}</p>
            <p><strong>Estado:</strong> ${servicio.estado}</p>
            <br>
            <button class="btn btn-editar" id="editar-${servicio.id}">Editar</button>
            <button class="btn btn-eliminar" id="eliminar-${servicio.id}">Eliminar</button>
        `;
        listado.appendChild(tarjeta);

        
        document.getElementById(`editar-${servicio.id}`).addEventListener('click', () => prepararEdicion(servicio));
        document.getElementById(`eliminar-${servicio.id}`).addEventListener('click', () => borrar(servicio.id));
    });
}


formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const id = document.getElementById('idServicio').value;
    const datos = {
        tipo: document.getElementById('tipo').value,
        descripcion: document.getElementById('descripcion').value,
        responsable: document.getElementById('responsable').value,
        estado: document.getElementById('estado').value
    };

    if (id) {
        
        await actualizarServicio(id, datos);
    } else {
        
        await crearServicio(datos);
    }

    cerrarModal();
    cargarYMostrar();
});


async function borrar(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este servicio público?")) {
        await eliminarServicio(id);
        cargarYMostrar();
    }
}


function prepararEdicion(servicio) {
    document.getElementById('idServicio').value = servicio.id;
    document.getElementById('tipo').value = servicio.tipo;
    document.getElementById('descripcion').value = servicio.descripcion;
    document.getElementById('responsable').value = servicio.responsable;
    document.getElementById('estado').value = servicio.estado;

    tituloModal.innerText = "Editar Servicio Municipal";
    ventanModal.style.display = 'flex';
}


botonNuevo.addEventListener('click', () => {
    formulario.reset();
    document.getElementById('idServicio').value = ''; 
    tituloModal.innerText = "Registrar Nuevo Servicio";
    ventanModal.style.display = 'flex';
});


function cerrarModal() {
    ventanModal.style.display = 'none';
}

botonCerrar.addEventListener('click', cerrarModal);


cargarYMostrar();
