import express from 'express'
const router = express.Router();

import controllers from '../../../useCases/index.js';

//loginuser
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await controllers.userAuthControllers.authUser(email, password);
    if (response.status === 'ok') {
      if (response.role === 'client') {
        res.cookie('jwtClient', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
        console.log(response.client);
        res.status(200).json({ status: 'ok', role: 'client', client: response.client });
      }
      else {
        res.cookie('jwtTherapist', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
        console.log(response.therapist);
        res.status(200).json({ status: 'ok', role: 'therapist', therapist: response.therapist });
      }
    }
  } catch (error) {
    console.log(error)
  }
});


export default router;