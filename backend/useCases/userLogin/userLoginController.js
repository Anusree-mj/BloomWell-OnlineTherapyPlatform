import { generateClientToken, generateTherapistsToken } from '../../utilitis/token.js';
import userAuthQueries from '../../infrastructure/dbQueries/user/userAuthQueries.js';

// auth user
const authUser = async (email, password) => {
    try {
        console.log('entereed in user controllerrrrrrrrr');
        const response = await userAuthQueries.userDoLogin(email, password);
        if (response) {
            if (response.role === 'client') {
                const { client } = response;
                const token = generateClientToken(client._id);
                return { status: 'ok', client, token, role: 'client' }
            }
            // else{
            //     const { therapist } = response;
            //     const token = generateTherapistsToken(therapist._id);
            //     return { status: 'ok', therapist, token,role:'therapist' } 
            // }
        } else {
            return { status: 'nok' }
        }
    } catch (error) {
        console.log('Error found', error)
    }
}


export {
    authUser,
}