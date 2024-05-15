import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../../useCases/index.js'

// get dashboard
router.get('/view', protectAdmin, async (req, res) => {
    try {
        console.log('entered in client view routes')
        const { clients } = await controllers.adminControllers.getClientsDetailsController();
        if (clients) {
            res.status(200).json({
                status: 'ok',
                clients: clients
            });
        } else {
            res.status(401).json({ status: 'nok', message: 'Admin not found' })
        }
    } catch (err) {
        console.log(err)
    }
})

export default router;