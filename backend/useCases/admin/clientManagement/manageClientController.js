import manageClientQueries from "../../../infrastructure/dbQueries/admin/manageClientQueries.js";


// get clients
const getClientsDetailsController = async () => {
    try {
        const { clients } = await manageClientQueries.getClientsDetailsQuery();
        return { clients }
    } catch (err) {
        console.log('Error found', err)

    }
}
// delet clients
const deleteClientController = async (clientId) => {
    try {
        const { status } = await manageClientQueries.deleteClientQuery(clientId);
        if (status === 'ok') {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

// edit clients
const editClientController = async (clientId) => {
    try {
        const { status } = await manageClientQueries.editClientQuery(clientId);
        if (status === 'ok') {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

export {
    getClientsDetailsController,
    deleteClientController,
    editClientController,
}