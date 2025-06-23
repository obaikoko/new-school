import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createResult,
  getResult,
  getResults,
  getStudentResults,
  updateResult,
  deleteResult,
  updateResultPayment,
  generatePositions,
  generateBroadsheet,
  addSubjectToResults,
  manualSubjectRemoval,
  exportResult,
  resultData,
  exportManyResults,
} from '../controllers/resultController';

const router = express.Router();
router.route('/positions').post(protect, generatePositions);
router.route('/broadsheet').post(protect, generateBroadsheet);
router.route('/payment').put(protect, updateResultPayment);
router
  .route('/subjects')
  .put(protect, manualSubjectRemoval)
  .post(protect, addSubjectToResults);
router.route('/data').get(protect, resultData);
router.route('/pdf').get(exportManyResults);
router
  .route('/:id')
  .post(protect, createResult)
  .get(protect, getResult)
  .put(protect, updateResult)
  .delete(protect, deleteResult);
router.route('/student/:id').get(protect, getStudentResults);
router.route('/pdf/:id').get(exportResult);

router.route('/').get(protect, getResults);

export default router;
