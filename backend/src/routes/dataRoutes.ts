import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { studentsData } from '../controllers/data-controller';

const router = express.Router();

router.route('/students').get(protect, admin, studentsData);

export default router;
