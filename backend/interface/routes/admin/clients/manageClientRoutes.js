import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../../useCases/index.js'

// get dashboard
router.get('/view', protectAdmin, async (req, res) => {
    try {
        console.log('entered in client view routes')

    } catch (err) {
        console.log(err)
    }
})

export default router;