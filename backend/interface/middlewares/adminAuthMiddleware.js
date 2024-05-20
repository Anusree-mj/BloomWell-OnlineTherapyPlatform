import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../../entities/admin/adminModel.js';

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwtAdmin;
    console.log('token found', token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decoded', decoded)
            req.admin = await Admin.findById(decoded.id).select('-password');
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