import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';

// get therapist details
router.get('/:therapistId', controllers.therapistControllers.getTherapistData)




export default router;