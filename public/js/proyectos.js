import { postAllData, getAllData, deleteData, patchData } from "../services/fetch.js"
const inputProyecto = document.getElementById("inputProyecto")
const inputdescripcion = document.getElementById("inputDescripcion")
const inputpresupuesto = document.getElementById("inputpresupuesto")
const inputfechadeInicio = document.getElementById("inputfechaInicio")
const estado = document.getElementById("inputestado")
const btnEnviarProyecto = document.getElementById("btnEnviarProyecto")

async function subirProyecto() {
    const objProyecto = {
        proyecto: inputProyecto.value,
        descripcion: inputdescripcion.value,
        presupuesto: inputpresupuesto.value,
        fechaInicio: inputfechadeInicio.value,
        estado: estado.value
    }
    await postAllData(objProyecto, "proyectos")
}

btnEnviarProyecto.addEventListener("click", async function (e) {
    e.preventDefault();
    await subirProyecto()
    alert("Proyecto enviado con éxito")
    inputProyecto.value = ""
    inputdescripcion.value = ""
    inputpresupuesto.value = ""
    inputfechadeInicio.value = ""
    estado.value = "En planificación"
})

//GET
async function mostrarProyectos() {
    const proyectos = await getAllData("proyectos")
    const contenedorProyectos = document.getElementById("contenedorProyectos")

    if (proyectos.length === 0) {
        contenedorProyectos.innerHTML = `
            <div class="glass" style="padding: 40px; text-align: center; color: #666;">
                <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <p>Aún no se han registrado proyectos.</p>
            </div>
        `;
        return;
    }
    proyectos.forEach(proyecto => {
        const btnEliminar = document.createElement("button")
        const btnEditar = document.createElement("button")

        btnEliminar.textContent = "Eliminar"
        btnEditar.textContent = "Editar"
        const contenedorProyecto = document.createElement("div")
        contenedorProyecto.classList.add("glass")
        contenedorProyecto.style.padding = "20px"
        const nombreProyecto = document.createElement("h3")
        const descripcionProyecto = document.createElement("p")
        const presupuestoProyecto = document.createElement("p")
        const fechaInicioProyecto = document.createElement("p")
        const estadoProyecto = document.createElement("p")

        nombreProyecto.textContent = proyecto.proyecto
        descripcionProyecto.textContent = `Descripción: ${proyecto.descripcion}`
        presupuestoProyecto.textContent = `Presupuesto: $${proyecto.presupuesto}`
        fechaInicioProyecto.textContent = `Fecha de Inicio: ${proyecto.fechaInicio}`
        estadoProyecto.textContent = `Estado: ${proyecto.estado}`

        contenedorProyecto.appendChild(nombreProyecto)
        contenedorProyecto.appendChild(descripcionProyecto)
        contenedorProyecto.appendChild(presupuestoProyecto)
        contenedorProyecto.appendChild(fechaInicioProyecto)
        contenedorProyecto.appendChild(estadoProyecto)
        contenedorProyecto.appendChild(btnEliminar)
        contenedorProyecto.appendChild(btnEditar)

        contenedorProyectos.appendChild(contenedorProyecto)


        btnEliminar.addEventListener("click", async () => {
            deleteData("proyectos", proyecto.id)
            alert("Proyecto eliminado con éxito")
            mostrarProyectos()
        })
        btnEditar.addEventListener("click",async()=>{
            const nuevoNombre = prompt("Ingrese el nuevo nombre del proyecto:", proyecto.proyecto)
            const nuevaDescripcion = prompt("Ingrese la nueva descripción del proyecto:", proyecto.descripcion)
            const nuevoPresupuesto = prompt("Ingrese el nuevo presupuesto del proyecto:", proyecto.presupuesto)
            const nuevaFechaInicio = prompt("Ingrese la nueva fecha de inicio del proyecto:", proyecto.fechaInicio)
            const nuevoEstado = prompt("Ingrese el nuevo estado del proyecto:", proyecto.estado)

            if (nuevoNombre && nuevaDescripcion && nuevoPresupuesto && nuevaFechaInicio && nuevoEstado) {
                const proyectoActualizado = {
                    proyecto: nuevoNombre,
                    descripcion: nuevaDescripcion,
                    presupuesto: nuevoPresupuesto,
                    fechaInicio: nuevaFechaInicio,
                    estado: nuevoEstado
                }
                await patchData(proyectoActualizado, "proyectos", proyecto.id)
                alert("Proyecto actualizado con éxito")
                mostrarProyectos()
            } else {
                alert("Todos los campos son obligatorios para actualizar el proyecto.")
            }


        
        })

    });
}

mostrarProyectos()