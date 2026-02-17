import { deleteData, getAllData,patchData } from "../services/fetch.js";
const contentTable = document.getElementById("contentTable")


async function mostrarReportes() {
    contentTable.textContent = ""
    const reportes = await getAllData("reportes")

    if (reportes.length === 0) {
        contentTable.innerHTML = `
            <div class="glass" style="padding: 40px; text-align: center; color: #666;">
                <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <p>Aún no se han realizado reportes.</p>
            </div>
        `;
        return;
    }
    reportes.forEach(reporte => {
        const divCont = document.createElement("div")
        const h3Tipo = document.createElement("h3")
        const pUbi = document.createElement("p")
        const pDesc = document.createElement("p")
        const btnEliminar = document.createElement("button")
        const btnEditar = document.createElement("button")

        h3Tipo.textContent = reporte.tipoReporte
        pUbi.innerHTML = `<strong>Ubicación:</strong> ${reporte.ubicacion}`
        pDesc.innerHTML = `<strong>Descripción:</strong> ${reporte.descripcion}`
        btnEliminar.textContent = "Eliminar"
        btnEditar.textContent = "Editar"

        divCont.appendChild(h3Tipo)
        divCont.appendChild(pUbi)
        divCont.appendChild(pDesc)
        divCont.appendChild(btnEliminar)
        divCont.appendChild(btnEditar)

        contentTable.appendChild(divCont)


        btnEliminar.addEventListener("click",async()=>{
            deleteData("reportes",reporte.id)
            alert("Reporte eliminado con éxito")
            mostrarReportes()
        })

        btnEditar.addEventListener("click",async()=>{
            const nuevoTipo = prompt("Ingrese el nuevo tipo de reporte:", reporte.tipoReporte);
            const nuevaUbicacion = prompt("Ingrese la nueva ubicación:", reporte.ubicacion);
            const nuevaDescripcion = prompt("Ingrese la nueva descripción:", reporte.descripcion);

            if (nuevoTipo && nuevaUbicacion && nuevaDescripcion) {
                const reporteActualizado = {
                    tipoReporte: nuevoTipo,
                    ubicacion: nuevaUbicacion,
                    descripcion: nuevaDescripcion,
                    usuario: reporte.usuario
                };
                await patchData(reporteActualizado, "reportes", reporte.id);
                alert("Reporte actualizado con éxito");
                mostrarReportes();
            } else {
                alert("Todos los campos son obligatorios para actualizar el reporte.");
            }
        })

    });
}


mostrarReportes()