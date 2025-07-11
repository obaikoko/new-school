import {
  authStudent,
  deleteStudent,
  exportStudentsCSV,
  forgetPassword,
  getAllStudents,
  getStudent,
  getStudentsRegisteredByUser,
  registerStudent,
  updateStudent,
  graduateStudent,
  resetPassword,
} from '../controllers/studentController';
import { protect, admin } from '../middleware/authMiddleware';
import express from 'express';

const router = express.Router();
router.route('/').get(protect, getAllStudents);
router.route('/export-cvs').get(protect, admin, exportStudentsCSV);
router
  .route('/search/registered-user')
  .get(protect, getStudentsRegisteredByUser);
router.route('/register').post(protect, admin, registerStudent);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password').put(resetPassword);
router.route('/graduate').put(protect, admin, graduateStudent);

router.route('/auth').post(authStudent);
router
  .route('/:id')
  .get(protect, getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

export default router;
