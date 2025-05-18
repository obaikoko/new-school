import { authStudent, registerStudent } from '../controllers/studentController';
import { protect, admin } from '../middleware/authMiddleware';
import express from 'express';

const router = express.Router();

router.route('/register').post(protect, admin, registerStudent);
router.route('/auth').post(authStudent);

export default router;
