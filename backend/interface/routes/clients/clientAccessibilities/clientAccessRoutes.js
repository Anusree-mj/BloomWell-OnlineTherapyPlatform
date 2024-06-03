import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';

router.get('/connection/:clientId', controllers.clientControllers.getConnections)

router.get('/:clientId', controllers.clientControllers.getClientData)

export default router;