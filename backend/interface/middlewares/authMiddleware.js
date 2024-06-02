import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../../entities/users/userModel.js';

const protect = (tokenType) => asyncHandler(async (req, res, next) => {
    let token;
    if (tokenType === 'client') {
        token = req.cookies.jwtClient;
    console.log(req.cookies,'cjfdsfsdf')
    } else if (tokenType === 'therapist') {
        token = req.cookies.jwtTherapist;
    }
    console.log(token, 'token foundd')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');
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

export { protect }