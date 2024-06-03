import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'

// get client details
router.get('/:clientId', protect('client'), controllers.clientControllers.getClientData)
// get connections
router.get('/connection/:clientId', protect('client'), controllers.clientControllers.getConnectionController)
// post connections
router.post('/connection', protect('client'), controllers.clientControllers.postConnectionController)

export default router;