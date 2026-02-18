const modal = document.getElementById('modal-planilla');
const btnNuevaPlanilla = document.getElementById('btn-nueva-planilla');
const modalClose = document.querySelectorAll('.modal-close');
const formPlanilla = document.getElementById('form-planilla');
const tablaPlanillas = document.getElementById('tabla-planillas');
const alertContainer = document.getElementById('alert-container');
const salarioNetoInput = document.getElementById('salario-neto');

// URL del backend
const API_URL = 'http://localhost:3000/planillas';

// Mostrar/Ocultar modal
btnNuevaPlanilla.addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Registrar Planilla';
    formPlanilla.reset();
    document.getElementById('planilla-id').value = '';
    modal.style.display = 'flex';
});

modalClose.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Calcular salario neto en tiempo real
const camposCalculos = [
    document.getElementById('salario-base'),
    document.getElementById('horas-extra'),
    document.getElementById('valor-hora-extra'),
    document.getElementById('rebajos')
];

camposCalculos.forEach(campo => {
    campo.addEventListener('input', calcularNeto);
});

function calcularNeto() {
    const salarioBase = parseFloat(document.getElementById('salario-base').value) || 0;
    const horasExtra = parseFloat(document.getElementById('horas-extra').value) || 0;
    const valorHoraExtra = parseFloat(document.getElementById('valor-hora-extra').value) || 0;
    const rebajos = parseFloat(document.getElementById('rebajos').value) || 0;
    const salarioNeto = (salarioBase + (horasExtra * valorHoraExtra) - rebajos).toFixed(2);
    salarioNetoInput.value = salarioNeto;
}

// Cargar planillas al iniciar
document.addEventListener('DOMContentLoaded', cargarPlanillas);

// Cargar listado de planillas
function cargarPlanillas() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            tablaPlanillas.innerHTML = '';
            data.planillas.forEach(planilla => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${planilla.id}</td>
                    <td>${planilla.nombre_empleado} (${planilla.id_empleado})</td>
                    <td>${planilla.departamento}</td>
                    <td>₡${planilla.salario_base.toFixed(2)}</td>
                    <td>₡${planilla.salario_neto.toFixed(2)}</td>
                    <td>${planilla.fecha_pago}</td>
                    <td class="table-actions">
                        <button class="btn btn-warning btn-sm" onclick="editarPlanilla(${planilla.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarPlanilla(${planilla.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                tablaPlanillas.appendChild(fila);
            });
        })
        .catch(error => mostrarAlerta('Error al cargar planillas: ' + error.message, 'error'));
}