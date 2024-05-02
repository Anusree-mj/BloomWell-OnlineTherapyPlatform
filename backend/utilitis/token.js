import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), secure: false });
}

const generateAdminToken = (token) => {
    return jwt.sign({ adminId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}
export { generateToken, generateAdminToken };