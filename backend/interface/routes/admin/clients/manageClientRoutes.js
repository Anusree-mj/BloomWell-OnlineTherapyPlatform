import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../../useCases/index.js'

// get client details
router.get('/view', protectAdmin, async (req, res) => {
    try {
        console.log('entered in get client details')
        const { clients } = await controllers.adminControllers.getClientsDetailsController();
        if (clients) {
            res.status(200).json({
                status: 'ok',
                clients: clients
            });
        } else {
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log(err)
    }
})

// delete client
router.delete('/:clientId', protectAdmin, async (req, res) => {
    try {
        console.log('entered in delete routes')
        const clientId = req.params.clientId
        const { status } = await controllers.adminControllers.deleteClientController(clientId);
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

// edit client
router.put('/:clientId', protectAdmin, async (req, res) => {
    try {
        console.log('entered in edit routes')
        const clientId = req.params.clientId
        const { status } = await controllers.adminControllers.editClientController(clientId);
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