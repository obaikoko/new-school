import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
  sendMail,
  forgetPassword,
  resetPassword,
} from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';
import express from 'express';

const router = express.Router();
router.route('/').get(protect, admin, getUsers);
router.route('/register').post(registerUser);
router.route('/auth').post(authUser);
router.post('/mails', protect, admin, sendMail);

router.post('/logout', logoutUser);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password').put(resetPassword);


router.route('/profile').get(protect, getUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
