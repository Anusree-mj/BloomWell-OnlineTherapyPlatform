import express from 'express'
const router = express.Router();
import controllers from '../../../useCases/index.js';


router.post('/login', controllers.adminControllers.authAdmin)
router.get('/feedbacks', controllers.adminControllers.getFeedbackControllers)


export default router;