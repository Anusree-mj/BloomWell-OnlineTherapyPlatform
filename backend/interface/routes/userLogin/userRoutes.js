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

router.post('/getOtp', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('entered in get otp route')
    const response = await controllers.userAuthControllers.getOtpController(email)
    if (response.status === 'ok') {
      console.log('otp sent')
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'nok', message: 'User already exists' })
    }
  } catch (err) {
    console.log(err)
  }
})
// forgot password
router.post('/forgotPassword/getOtp', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('entered in forgot password get otp route')
    const { status } = await controllers.userAuthControllers.getForgotPasswordOTP(email)
    if (status === 'ok') {
      console.log('otp sent')
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'nok', message: 'Invalid email' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/forgotPassword/verifyOtp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('entered in forgot password get otp route',email,otp)

    const { status } = await controllers.userAuthControllers.verifyOTP(email, otp)
    if (status === 'ok') {
      console.log('otp matched')
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'nok', message: 'Invalid OTP' })
    }
  } catch (err) {
    console.log(err)
  }
})

export default router;