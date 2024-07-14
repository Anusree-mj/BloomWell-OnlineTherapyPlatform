import express from 'express'
const router = express.Router();
import controllers from '../../../useCases/index.js';
import { protectAdmin } from '../../middlewares/adminAuthMiddleware.js';

router.post('/login', controllers.adminControllers.authAdmin)
// get feedbacks
router.get('/feedbacks', protectAdmin, controllers.adminControllers.getFeedbackControllers)
// get dashbaord details
router.get('/dashboard', protectAdmin, controllers.adminControllers.getDashboardDetailsControllers)
router.get('/dashboard/therapyCount', protectAdmin, controllers.adminControllers.getTherapyCountControllers)
router.get('/dashboard/topTherapist', controllers.adminControllers.getTopTherapistsControllers)


export default router;