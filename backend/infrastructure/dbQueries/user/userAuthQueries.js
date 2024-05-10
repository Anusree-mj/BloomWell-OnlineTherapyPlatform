import User from '../../../entities/userModel.js';


const userDoLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email: email, password: password }).select('-password');
        if (user) {
            return user
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
