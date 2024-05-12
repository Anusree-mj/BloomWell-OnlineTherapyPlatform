import jwt from "jsonwebtoken";

const generateClientToken = (token) => {
    return jwt.sign({ clientId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const generateTherapistsToken = (token) => {
    return jwt.sign({ therapistId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const generateAdminToken = (token) => {
    return jwt.sign({ adminId: token }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}
export  { generateClientToken, generateAdminToken, generateTherapistsToken };