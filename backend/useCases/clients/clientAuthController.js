import { generateToken } from '../../utilitis/token.js';
import clientAuthQueries from '../../infrastructure/dbQueries/client/clientAuthQueries.js';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

// google signup
const googleSignup = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.header('Referrer-Policy', 'no-referrer-when-downgrade')
        const redirectUrl = 'http://localhost:8000/client/googleAuth'
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
            prompt: 'consent'
        })
        res.json({ url: authorizeUrl })

    } catch (err) {
        console.log('Error found', err)
    }
}

const getUserData = async (access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`)
    const data = await response.json();
    console.log('data got in google auth', data)
}

const getAuthData = async (req, res) => {
    const code = req.query.code;
    console.log('code in req', code);
    try {
        const redirectUrl = ''
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user)
        await getUserData(user.access_token)
    } catch (err) {
        console.log('Errof found', err)
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
            res.cookie('jwtClient', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
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
            console.log('successfully passed client data')
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
    getAuthData
}