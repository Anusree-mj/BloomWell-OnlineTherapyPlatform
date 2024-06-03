import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Client from '../../entities/clients/clients.js';
import Therapists from '../../entities/therapists/therapist.js';

const protect = (tokenType) => asyncHandler(async (req, res, next) => {
    let token;
    if (tokenType === 'client') {
        token = req.cookies.jwtClient;
    } else if (tokenType === 'therapist') {
        token = req.cookies.jwtTherapist;
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded,'decodeddd')
            if (tokenType === 'client') {
                req.user = await Client.findById(decoded.id).select('-password');
            } else  {
                req.user = await Therapists.findById(decoded.id).select('-password');
            }
            console.log(req.user,'req userrr')
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