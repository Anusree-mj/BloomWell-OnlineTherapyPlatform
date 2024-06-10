import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js';

router.get('/payment',  controllers.clientControllers.getPaymentDetails)
router.post('/payment', protect('client'), controllers.clientControllers.postPaymentDetails)
router.post('/payment/cancel',protect('client'),controllers.clientControllers.cancelSubscription)

export default router;