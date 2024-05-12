import Admin from '../../../entities/admin/adminModel.js';
import User from '../../../entities/userModel.js';


const adminDoLogin = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email: email, password: password }).select('-password');
        if (admin) {
            return admin
        } else {
            console.log('no admin')
        }
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    adminDoLogin,
}
