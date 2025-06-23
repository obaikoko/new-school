import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  addNextTermInfo,
  getNextTermInfo,
} from '../controllers/nextTermController';

const router = express.Router();

router.route('/').get(getNextTermInfo).put(protect, admin, addNextTermInfo);

export default router;
