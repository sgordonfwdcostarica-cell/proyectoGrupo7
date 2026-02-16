async function postData(endpoint, data) {
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

export { postData,getUsuarios };
