import manageClientQueries from "../../../infrastructure/dbQueries/admin/manageClientQueries.js";


// get clients
const getClientsDetailsController = async (req, res) => {
    try {
        const { clients } = await manageClientQueries.getClientsDetailsQuery();
        if (clients) {
            res.status(200).json({
                status: 'ok',
                clients: clients
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log(err)
    }
}


// delet clients
const deleteClientController = async (req, res) => {
    try {
        const clientId = req.params.clientId
        const { status } = await manageClientQueries.deleteClientQuery(clientId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User blocked succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log(err, 'error found')
    }
}

// edit clients
const editClientController = async (req, res) => {
    try {
        const clientId = req.params.clientId
        const { status } = await manageClientQueries.editClientQuery(clientId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User unblocked succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log('Error found', err)
    }
}

export {
    getClientsDetailsController,
    deleteClientController,
    editClientController,
    
}