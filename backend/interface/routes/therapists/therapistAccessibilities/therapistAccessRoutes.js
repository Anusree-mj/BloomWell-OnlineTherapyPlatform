import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import {protect} from '../../../middlewares/authMiddleware.js'

router.get('/connections', protect('therapist'), controllers.therapistControllers.getConnectionRequestController)


export default router;