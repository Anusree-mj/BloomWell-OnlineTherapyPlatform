import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Client from '../../entities/clients/clients.js';
import Therapists from '../../entities/therapists/therapist.js';

const protect = (tokenType) => asyncHandler(async (req, res, next) => {
    console.log('reached protect')
    let token;
    console.log('reaques',req.cookies.jwtClient)
    if (tokenType === 'client') {
        token = req.cookies.jwtClient;
    } else if (tokenType === 'therapist') {
        token = req.cookies.jwtTherapist;
    }
    console.log('token found', token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded, 'decodeddd')
            let user;
            if (tokenType === 'client') {
                user = await Client.findById(decoded.id).select('-password');
            } else {
                user = await Therapists.findById(decoded.id).select('-password');
            }
            if (!user.isBlocked) {
                req.user = user;
                console.log(req.user, 'req userrr')
                next();
            } else {
                res.status(401).json({ message: 'User is blocked' });
            }
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