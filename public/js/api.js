const URL_API = 'http://localhost:3003/servicios';

export async function obtenerServicios() {
    try {
        const respuesta = await fetch(URL_API);
        return await respuesta.json(); 
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
    }
}

export async function crearServicio(datos) {
    try {
        await fetch(URL_API, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error al crear el servicio:", error);
    }
}

export async function actualizarServicio(id, datos) {
    try {
        await fetch(`${URL_API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
    }
}

export async function eliminarServicio(id) {
    try {
        await fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
    }
}
