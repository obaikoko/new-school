import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  deleteStaff,
  getAllStaff,
  getStaff,
  registerStaff,
  staffData,
  updateStaff,
} from '../controllers/staff-controller';

const router = express.Router();

router
  .route('/')
  .get(protect, admin, getAllStaff)
  .post(protect, admin, registerStaff);
router.route('/data').get(protect, admin, staffData);

router
  .route('/:id')
  .get(protect, admin, getStaff)
  .put(protect, admin, updateStaff)
  .delete(protect, admin, deleteStaff);

export default router;
