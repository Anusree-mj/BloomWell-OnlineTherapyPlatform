import express from 'express'
const router = express.Router();
import controllers from '../../../useCases/index.js';
import { protectAdmin } from '../../middlewares/adminAuthMiddleware.js';

router.post('/login', controllers.adminControllers.authAdmin)
// get feedbacks
router.get('/feedbacks', protectAdmin, controllers.adminControllers.getFeedbackControllers)
// get dashbaord details
router.get('/dashboard', controllers.adminControllers.getDashboardDetailsControllers)

export default router;