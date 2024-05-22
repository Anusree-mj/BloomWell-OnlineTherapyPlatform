import jwt from "jsonwebtoken";

export const generateToken = (token) => {
    return jwt.sign({ id: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

