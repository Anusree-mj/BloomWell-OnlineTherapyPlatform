import { generateAdminToken } from '../../../utilitis/token.js';
import adminAuthQueries from '../../../infrastructure/dbQueries/admin/adminAuthQueries.js'

// auth user
const authAdmin = async (email, password) => {
    try {
        console.log('entered in authadmin')
        const admin = await adminAuthQueries.adminDoLogin(email, password);
        if (admin) {
            const token = generateAdminToken(admin._id);
            return { status: 'ok', admin, token };
        } else {
            return { status: 'nok' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}



export {
    authAdmin,
}