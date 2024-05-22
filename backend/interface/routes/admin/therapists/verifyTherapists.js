import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../../useCases/index.js'

// get therapists details
router.get('/view', protectAdmin, async (req, res) => {
    try {
        console.log('entered in get client details')
        const { therapists } = await controllers.adminControllers.getTherapistsDetailsController();
        if (therapists) {
            console.log(therapists, 'therapists details')
            res.status(200).json({
                status: 'ok',
                therapists: therapists
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log(err)
    }
})

// verify therapist
router.post('/:therapistId/verify', protectAdmin, async (req, res) => {
    try {
        console.log('entered in verify routes')
        const therapistId = req.params.therapistId
        const { verifyStatus } = req.body;
        const { status } = await controllers.adminControllers.verifyTherapistController(
            therapistId, verifyStatus
        )
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'Therapist verified succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log(err)
    }
})
// delete therapist
router.delete('/:therapistId', protectAdmin, async (req, res) => {
    try {
        console.log('entered in delete routes')
        const therapistId = req.params.therapistId
        const { status } = await controllers.adminControllers.deleteTherapistController(therapistId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User blocked succesfully'
            });
        } else {
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log(err)
    }
})

// edit therapsit
router.put('/:therapistId', protectAdmin, async (req, res) => {
    try {
        console.log('entered in edit routes')
        const therapistId = req.params.therapistId
        const { status } = await controllers.adminControllers.editTherapistController(therapistId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User unblocked succesfully'
            });
        } else {
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log(err)
    }
})
export default router;