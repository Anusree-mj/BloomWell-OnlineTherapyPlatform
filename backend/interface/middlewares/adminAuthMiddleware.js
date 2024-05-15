import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../../entities/admin/adminModel.js';

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwtAdmin;
    console.log('token found', token)
    if (token) {
        try {
            console.log('Token found, verifying...');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            req.admin = await Admin.findById(decoded.adminId).select('-password');
            console.log('Admin verified:', req.admin);
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protectAdmin }