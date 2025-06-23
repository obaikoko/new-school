import express from 'express';
import {
  createAdmission,
  deleteAdmission,
  getAllRequest,
  getSingleRequest,
  sendMail,
} from '../controllers/admission-controller';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(createAdmission).get(protect, admin, getAllRequest);
router
  .route('/:id')
  .get(protect, admin, getSingleRequest)
  .post(protect, admin, sendMail)
  .delete(protect, admin, deleteAdmission);

export default router;
