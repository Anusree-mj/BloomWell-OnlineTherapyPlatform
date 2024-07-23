import { generateToken } from '../../utilitis/token.js';
import clientAuthQueries from '../../infrastructure/dbQueries/client/clientAuthQueries.js';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

// google signup
const googleSignup = async (req, res) => {
    try {
        const { profile } = req.body;
        console.log('profile details got in controller', profile)
        const { data } = await axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
                headers: {
                    Authorization: `Bearer ${profile.access_token}`,
                    Accept: 'application/json'
                }
            })
        console.log('data got from google', data)
        const response = await clientAuthQueries.saveAuthData(data);
        if (response.status === 'ok') {
            const { user } = response;
            const token = generateToken(user._id)
            res.cookie('jwtClient', token, {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
                sameSite: 'None' // Allow cookies to be sent cross-origin
            });
            res.status(200).json({ status: 'ok', client: user });
        } else {
            res.status(400).json({ status: 'nok', message: 'Something went wrong' });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// signup
const signUp = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientAuthQueries.verifyOTP(data, 'client');
        if (response.status === 'ok') {
            const { user } = response;
            const token = generateToken(user._id)
            res.cookie('jwtClient', token, {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
                sameSite: 'None' // Allow cookies to be sent cross-origin
            });
            res.status(200).json({ status: 'ok', client: user });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}


// save data 
const saveClientData = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientAuthQueries.saveClientData(data);
        if (response.status === 'ok') {
            const { status, client } = response
            res.status(200).json({ status: status, client: client });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// get client data
const getClientData = async (req, res) => {
    try {
        const clientId = req.user._id
        const response = await clientAuthQueries.getClientDataQuery(clientId);
        console.log('reached in client data controllersssssssss')
        if (response.status === 'ok') {
            const { status, client } = response
            console.log('successfully passed client data', client)
            res.status(200).json({ status: status, client: client });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    signUp,
    saveClientData,
    getClientData,
    googleSignup,
}