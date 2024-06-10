import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
// import { OAuth2Client } from 'google-auth-library';

// router.post('/signUpGoogle',controllers.clientControllers.googleSignup)
router.post('/signup', controllers.clientControllers.signUp)

router.post('/', controllers.clientControllers.saveClientData)

export default router;