import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';

router.get('/payment', controllers.clientControllers.getPaymentDetails)
router.post('/payment', controllers.clientControllers.postPaymentDetails)


export default router;