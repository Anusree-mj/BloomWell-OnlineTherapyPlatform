import { generateToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';


// signup
const signUp = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.verifyOTP(data, 'client');
        if (response.status === 'ok') {
            const { client } = response;
            const token = generateToken(client._id)
            console.log(token, 'token found in signup')
            return { status: 'ok', client, token };
        } else {
            const { message } = response
            return { status: 'nok', message }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

// save data 
const saveClientData = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.saveClientData(data);
        if (response.status === 'ok') {
            const { status, client } = response
            console.log(status, client, 'details got back in controller');
            return { status, client }
        } else {
            const { status, message } = response
            return { status, message }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}


export {
    signUp,
    saveClientData,
}