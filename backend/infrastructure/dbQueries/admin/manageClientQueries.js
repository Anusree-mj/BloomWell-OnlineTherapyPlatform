import Admin from '../../../entities/admin/adminModel.js';
import Client from '../../../entities/clients/clients.js';

const getClientsDetailsQuery = async () => {
    try {
        const clients = await Client.find({}).select('-password').sort({ createdAt: -1 });
        return { clients }
    }
    catch (err) {
        console.log(err)
    }
}

const getSingleClientsDetailsQuery = async (clientId) => {
    try {
        console.log('reached query in get single')
        const clients = await Client.findOne({ _id: clientId }).select('-password').sort({ createdAt: -1 });
        console.log('passed clients', clients)
        return { clients }
    }
    catch (err) {
        console.log(err)
    }
}

const deleteClientQuery = async (clientId) => {
    try {
        const client = await Client.findByIdAndUpdate(clientId, { isBlocked: true });
        if (client) {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err.message)
    }
}

const editClientQuery = async (clientId) => {
    try {
        const client = await Client.findByIdAndUpdate(clientId, { isBlocked: false });
        if (client) {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err.message)
    }
}

export default {
    getClientsDetailsQuery,
    deleteClientQuery,
    editClientQuery,
    getSingleClientsDetailsQuery,
}
