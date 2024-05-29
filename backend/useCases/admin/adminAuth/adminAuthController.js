import { generateToken } from '../../../utilitis/token.js';
import adminAuthQueries from '../../../infrastructure/dbQueries/admin/adminAuthQueries.js'

// auth user
const authAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminAuthQueries.adminDoLogin(email, password);
        if (admin) {
            const token = generateToken(admin._id);
            res.cookie('jwtAdmin', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ status: 'ok', admin: admin });
        } else {
            res.status(400).json({ status: 'nok', message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(400).json({ status: 'nok', message: 'Unexpected error occured' });
        console.log('Error found', err)
    }
}



export {
    authAdmin,
}