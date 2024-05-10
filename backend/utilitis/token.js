import jwt from "jsonwebtoken";

const generateToken = (token) => {
    return jwt.sign({ userId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const generateAdminToken = (token) => {
    return jwt.sign({ adminId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}
export { generateToken, generateAdminToken };