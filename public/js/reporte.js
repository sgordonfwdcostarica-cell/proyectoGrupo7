import { getAllData, postAllData } from "../services/fetch.js";

const reportForm = document.getElementById("reportForm");

const reportType = document.getElementById("reportType");
const location = document.getElementById("location");
const description = document.getElementById("description");

const submitButton = document.querySelector("#reportForm button[type='submit']");



async function subirReporte() {
    const objReporte = {
        tipoReporte: reportType.value,
        ubicacion: location.value,
        descripcion: description.value,
        usuario: localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null
    }
    await postAllData(objReporte, "reportes")
}


reportForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    await subirReporte()
    alert("Reporte enviado con éxito")
    reportForm.reset()
})


async function mostrarReportes() {
    const reportes = await getAllData("reportes")
    const contenedorReportes = document.getElementById("contenedorReportes");
    contenedorReportes.innerHTML = ""




    if (reportes.length === 0) {
        contenedorReportes.innerHTML = `
            <div class="glass" style="padding: 40px; text-align: center; color: #666;">
                <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <p>Aún no ha realizado ningún reporte.</p>
            </div>
        `;
        return;
    }
    reportes.filter(reporte => reporte.usuario === (localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null))
        .forEach(reporte => {
            const reporteHTML = `
            <div class="glass" style="padding: 20px;">
                <h3>${reporte.tipoReporte}</h3>
                <p><strong>Ubicación:</strong> ${reporte.ubicacion}</p>
                <p><strong>Descripción:</strong> ${reporte.descripcion}</p>
            </div>
        `;
            contenedorReportes.innerHTML += reporteHTML;
        });

}

mostrarReportes()