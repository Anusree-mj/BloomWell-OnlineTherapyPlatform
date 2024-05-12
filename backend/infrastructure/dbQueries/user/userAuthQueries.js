import Client from '../../../entities/clients/clients.js';
import User from '../../../entities/userModel.js';
import bcrypt from 'bcryptjs';


const userDoLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (matchPassword) {
                if (user.role === 'client') {
                    const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                    return { role: 'client', client }
                }
                // else {
                //     const therapist = await Therapist.findOne({ email: email }).select('-password -createdAt -updatedAt');
                //     return { role: 'therapist', therapist }
                // }
            }

        } else {
            console.log('no user')
        }
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    userDoLogin,
}
