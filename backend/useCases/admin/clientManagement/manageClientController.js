import manageClientQueries from "../../../infrastructure/dbQueries/admin/manageClientQueries.js";


// get clients
const getClientsDetailsController = async () => {
    try {
        const { clients } = await manageClientQueries.getClientsDetails();
        console.log(clients, 'clients gottt')
        return { clients }
    } catch (err) {
        console.log('Error found', err)

    }
}



export {
    getClientsDetailsController,
}