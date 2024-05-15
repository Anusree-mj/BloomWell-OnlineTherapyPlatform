import Admin from '../../../entities/admin/adminModel.js';
import Client from '../../../entities/clients/clients.js';

const getClientsDetails = async () => {
    try {
        const clients = await Client.find({}).select('-password');
        return { clients }
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getClientsDetails,
}
