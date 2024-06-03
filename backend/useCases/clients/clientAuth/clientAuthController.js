import { generateToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';


// signup
const signUp = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientAuthQueries.verifyOTP(data, 'client');
        if (response.status === 'ok') {
            const { user } = response;
            const token = generateToken(user._id)
            res.cookie('jwtClient', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ status: 'ok', client: user });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// save data 
const saveClientData = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientAuthQueries.saveClientData(data);
        if (response.status === 'ok') {
            const { status, client } = response
            res.status(200).json({ status: status, client: client });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// get client data
const getClientData = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const response = await clientAuthQueries.getClientData(clientId);
        if (response.status === 'ok') {
            const { status, client } = response
            console.log('successfully passed client data')
            res.status(200).json({ status: status, client: client });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    signUp,
    saveClientData,
    getClientData,
}