import { generateClientToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';


// signup
const signUp = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.verifyOTP(data);
        if (response.status === 'ok') {
            const { client } = response;
            const token = generateClientToken(client._id)
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


export {
    signUp,
}