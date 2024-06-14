import express from 'express'
const router = express.Router();
import controllers from '../../../useCases/index.js';
import { upload } from '../../../utilitis/multer.js';

router.post('/signup', controllers.therapistControllers.therapistsSignUp)
router.post('/uploadImage', upload.single('file'), controllers.therapistControllers.uploadImage)
const setCustomDestination = (destination) => (req, res, next) => {
    req.customDestination = destination;
    next();
};
router.post('/license', setCustomDestination('licenseProofs'), upload.single('file'), controllers.therapistControllers.uploadImage)
router.post('/', controllers.therapistControllers.saveTherapistData)

export default router;