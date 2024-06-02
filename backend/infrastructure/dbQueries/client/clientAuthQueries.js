import TempUser from "../../../entities/users/tempUsersModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/users/userModel.js";
import Therapists from "../../../entities/therapists/therapist.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const saveOtp = async (email, otp) => {
    try {
        const query = { email: email }
        const update = { otp: otp }
        const options = { upsert: true }
        const response = await TempUser.updateOne(query, update, options)
        if (response) return { status: 'ok' }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyOTP = async (data, role) => {
    try {
        console.log(role, 'role');
        const verify = await TempUser.findOne({ email: data.email, otp: data.otp });
        if (verify) {
            console.log('OTP matched');
            let user, newUser;
            if (role === 'client') {
                const { name, email, password } = data;
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.insertMany({ email: data.email, password: hashedPassword, role: role })
                newUser = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                };
                const client = await Client.create(newUser);
                user = await createStripeCustomer(client.email, client.name, client._id);
            } else {
                const { name, email, password, phone, licenseNum, roleType, image } = data;
                console.log('password:', password);
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.insertMany({ email: data.email, password: hashedPassword, role: role })
                newUser = {
                    name: name,
                    email: email,
                    phone: phone,
                    license: {
                        licenseNo: licenseNum,
                        licenseProof: image
                    },
                    role: roleType,
                    password: hashedPassword,
                };
                user = await Therapists.create(newUser);
            }
            console.log('New user created:', user);
            return { status: 'ok', user };
        } else {
            console.log('OTP does not match');
            return { status: 'nok', message: 'Invalid OTP' };
        }
    } catch (err) {
        console.error('Error in verifyOTP:', err);
        return { status: 'error', message: err.message };
    }
}

const createStripeCustomer = async (email, name, clientId) => {
    try {
        console.log('stripecustomer details: email:', email, 'name:', name, 'id:', clientId)
        const stripeCustomer = await stripe.customers.create({
            email: email,
            name: name
        })
        const query = { _id: clientId }
        const update = {
            subscription: {
                stripeCustomerId: stripeCustomer.id
            },
        }
        const options = { new: true }
        const updatedUser = await Client.updateOne(query, update, options)
        const user = await Client.findOne({ _id: clientId });
        return user;
    } catch (err) {
        console.error('Error in verifyOTP:', err);
        return;
    }
}


const saveClientData = async (data) => {
    try {
        const { email, type, age, answers } = data
        console.log(data, 'data in save details')
        const query = { email: email }
        const update = {
            sessionType: type,
            age: age,
            questionnaire: answers,
        }
        const options = { upsert: true }
        const response = await Client.updateOne(query, update, options)
        if (response) {
            const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
            return { status: 'ok', client }
        } else {
            return { status: 'nok', message: 'Client not found' }
        }
    } catch (err) {
        console.log(err)
    }
}


export default {
    saveOtp,
    verifyOTP,
    saveClientData,

}
