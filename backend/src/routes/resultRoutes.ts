import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createResult,
  getResult,
  getResults,
  getStudentResults,
} from '../controllers/resultController';

const router = express.Router();
router.route('/').get(protect, getResults);
router.route('/:id').post(protect, createResult).get(protect, getResult);
router.route('/student/:id').get(protect, getStudentResults);

export default router;
