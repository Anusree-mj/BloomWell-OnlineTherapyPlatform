import express from 'express'
const router = express.Router();

import controllers  from '../../../useCases/index.js';

import { protectAdmin } from '../../middlewares/adminAuthMiddleware.js';



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const response = await controllers.adminControllers.authAdmin(email, password)
        if (response.status === 'ok') {
            res.cookie('jwtAdmin', response.token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
            console.log(response.admin);
            res.status(200).json({ status: 'ok', admin: response.admin });
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
//     // .post(protectAdmin, addUser);




export default router;