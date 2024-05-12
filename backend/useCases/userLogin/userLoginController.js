import { generateToken } from '../../utilitis/token.js';
import userAuthQueries from '../../infrastructure/dbQueries/user/userAuthQueries.js';

// auth user
const authUser = async (email, password) => {
    try {
        console.log('entereed in user controllerrrrrrrrr');
        const user = await userAuthQueries.userDoLogin(email, password);
        if (user) {
            const token = generateToken(user._id);
            return { status: 'ok', user, token }
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