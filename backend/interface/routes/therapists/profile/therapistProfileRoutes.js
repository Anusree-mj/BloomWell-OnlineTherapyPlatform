import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';

// get therapist details
router.get('/:therapistId', async (req, res) => {
    try {
        console.log('entered in therapist detail routes')
        const therapistId = req.params.therapistId

        const response = await controllers.therapistControllers.getTherapistData(therapistId);
        if (response.status === 'ok') {
            const { therapist } = response
            console.log('therapist found', therapist)
            res.status(200).json({ status: 'ok', therapist });
        } else {
            res.status(400).json({ status: 'nok', message: response.message });
        }
    } catch (err) {
        console.log(err)
    }
})




export default router;