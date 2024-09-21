import nodemailer from 'nodemailer';

// const otpgenerator = require('otp-generator');

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}
const sendOtpByEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'anuanusree682@gmail.com',
            pass: 'wqrp aczk guep ppyc',
        },
        secure: true,
        port: 465,
    })
    const mailOptions = {
        from: 'anuanusree682@gmail.com',
        to: email,
        subject: 'OTP for BloomWell SigningUp',
        text: `Your OTP is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
}

export { generateOTP, sendOtpByEmail };
