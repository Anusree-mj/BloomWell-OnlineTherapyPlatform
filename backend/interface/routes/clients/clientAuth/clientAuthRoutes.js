import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';


router.post('/getOtp', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('entered in get otp route')
        const response = await controllers.clientControllers.getOtp(email)
        if (response.status==='ok') {
            console.log('otp sent')
            res.status(200).json({ status: 'ok' });
        } else {
            res.status(400).json({ status: 'nok', message: 'User already exists' })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const response = await controllers.clientControllers.signUp(data);
        if (response.status === 'ok') {
            res.cookie('jwtClient', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.status(200).json({ status: 'ok', client: response.client });
        } else {
            res.status(400).json({ status: 'nok', message: response.message });
        }
    } catch (err) {
        console.log(err)
    }
})
// router.get('/', protectAdmin, getAdminDashboard);
// router.post('/addUser', protectAdmin, addUser);
// router
//     .route('/user/:userId')
//     .delete(protectAdmin, deleteUser)
//     .put(protectAdmin, editUser)
// .post(protectAdmin, addUser);




export default router;