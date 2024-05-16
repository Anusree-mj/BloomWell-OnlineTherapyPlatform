import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';

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


export default router;