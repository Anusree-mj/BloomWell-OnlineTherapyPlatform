import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { upload } from '../../../../utilitis/multer.js';

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        console.log(data, 'data entered in routes')
        const response = await controllers.therapistControllers.therapistsSignUp(data);
        if (response.status === 'ok') {
            res.cookie('jwtTherapists', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ status: 'ok', therapist: response.therapist });
        } else {
            res.status(400).json({ status: 'nok', message: response.message });
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/uploadImage', upload.single('file'), async (req, res) => {
    try {

        const file = req.file
        console.log('entered in upload image router', req.file)
        const relativeImagePath = req.file.path.replace(/\\/g, '/').split('/public')[1];
        const imageUrl = `${req.protocol}://${req.get('host')}/public${relativeImagePath}`;
        console.log(relativeImagePath, imageUrl, 'sdfjsdlkjfskdjflkjlj')
        res.status(200).json({ imageUrl });
    } catch (err) {
        console.error('Error in /uploadImage route:', err.message, err.stack);
        res.status(500).json({ err: 'Internal Server err', details: err.message });
    }
})

const setCustomDestination = (destination) => (req, res, next) => {
    req.customDestination = destination;
    next();
};

router.post('/license',setCustomDestination('licenseProofs'),upload.single('file'), async (req, res) => {
    try {

        const file = req.file
        console.log('entered in upload image router', req.file)
        const relativeImagePath = req.file.path.replace(/\\/g, '/').split('/public')[1];
        const imageUrl = `${req.protocol}://${req.get('host')}/public${relativeImagePath}`;
        console.log(relativeImagePath, imageUrl, 'sdfjsdlkjfskdjflkjlj')
        res.status(200).json({ imageUrl });
    } catch (err) {
        console.error('Error in /uploadImage route:', err.message, err.stack);
        res.status(500).json({ err: 'Internal Server err', details: err.message });
    }
})


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data, 'data entered in routes')
        const response = await controllers.therapistControllers.saveTherapistData(data)
        if (response.status === 'ok') {
            console.log('details successfully logged in')
            res.status(200).json({ status: 'ok', therapist: response.therapist });
        } else {
            res.status(400).json({ status: 'nok', message: response.message });
        }
    } catch (err) {
        console.log(err)
    }
})

export default router;