import { generateToken } from '../../utilitis/token.js';
import adminAuthQueries from '../../infrastructure/dbQueries/admin/adminAuthQueries.js'
import dotenv from 'dotenv';
dotenv.config();

// auth user
const authAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminAuthQueries.adminDoLogin(email, password);
        if (admin) {
            const token = generateToken(admin._id);
            res.cookie('jwtAdmin', token, {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
                sameSite: 'None', // Allow cross-origin requests
            });
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