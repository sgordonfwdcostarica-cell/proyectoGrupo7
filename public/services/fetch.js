async function postData(data) {
    try {
        const response = await fetch(`http://localhost:3003/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
}


async function getUsuarios() {
    try {
        const peticion = await fetch(`http://localhost:3003/users`)
        const data = await peticion.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}



async function postAllData(data,endpoint) {
    try {
        const response = await fetch(`http://localhost:3003/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
}


async function getAllData(endpoint) {
    try {
        const peticion = await fetch(`http://localhost:3003/${endpoint}`)
        const data = await peticion.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}
async function deleteData(endpoint,id) {
    try {
        const response = await fetch(`http://localhost:3003/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
}


async function patchData(data,endpoint,id) {
    try {
        const response = await fetch(`http://localhost:3003/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
}

export { postData,getUsuarios,postAllData,getAllData,deleteData,patchData };
