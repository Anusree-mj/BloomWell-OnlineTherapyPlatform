import express from 'express'
const router = express.Router();

import {
  authUser
} from '../../useCases/userController.js';

//loginuser
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const response = await authUser(email, password);
    if (response.status === 'ok') {
      res.cookie('jwtUser', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
      console.log(response.user);
      res.status(200).json({ status: 'ok', user: response.user });
    }
  } catch (error) {
    console.log(error)
  }
});


export default router;