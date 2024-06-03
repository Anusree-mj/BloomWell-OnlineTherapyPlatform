import { generateToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';
import therapistQuery from '../../../infrastructure/dbQueries/therapist/therapistQuery.js';


// signup
const therapistsSignUp = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientAuthQueries.verifyOTP(data, 'therapists');
        if (response.status === 'ok') {
            const { user } = response;
            console.log(user, 'therapist received in controller')
            const token = generateToken(user._id)
            res.cookie('jwtTherapist', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ status: 'ok', therapist: user });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// save data 
const saveTherapistData = async (req, res) => {
    try {
        const data = req.body;
        const response = await therapistQuery.saveTherapistData(data);
        if (response.status === 'ok') {
            const { status, therapist } = response
            res.status(200).json({ status: status, therapist: therapist });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }

    } catch (err) {
        console.log('Error found', err)
    }
}

const uploadImage = async (req, res) => {
    try {
        const file = req.file
        const relativeImagePath = file.path.replace(/\\/g, '/').split('/public')[1];
        const imageUrl = `${req.protocol}://${req.get('host')}/public${relativeImagePath}`;
        console.log(relativeImagePath, imageUrl, 'sdfjsdlkjfskdjflkjlj')
        res.status(200).json({ imageUrl });
    } catch (err) {
        res.status(500).json({ err: 'Internal Server err', details: err.message });
        console.log('Error found', err)
    }
}

export {
    therapistsSignUp,
    saveTherapistData,
    uploadImage,
}