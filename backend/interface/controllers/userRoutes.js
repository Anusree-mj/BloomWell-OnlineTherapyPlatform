import express from 'express'
const router = express.Router();

import {
  authUser, registerUser,
  updateUserProfile, uploadImage,
  getUser
  
} from '../../useCases/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../../utilitis/multerConfig.js';

router.post('/', registerUser);//signup user
router.post('/auth', authUser);//loginuser
router.post('/uploadImage', upload.single('file'), uploadImage);//upload image
router
  .route('/profile')
  .get(protect, getUser)
  .put(protect, updateUserProfile);

export default router;