import express from 'express'
const router = express.Router();

import controllers  from '../../../useCases/index.js';


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

export default router;