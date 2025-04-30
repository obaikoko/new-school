import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';
import express from 'express';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/auth').post(authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, admin, updateUserProfile);

export default router;
