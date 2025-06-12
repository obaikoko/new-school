"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controllers/studentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, studentController_1.getAllStudents);
router.route('/export-cvs').get(authMiddleware_1.protect, authMiddleware_1.admin, studentController_1.exportStudentsCSV);
router.route('/pdf').get(authMiddleware_1.protect, studentController_1.exportStudentsPDF);
router
    .route('/search/registered-user')
    .get(authMiddleware_1.protect, studentController_1.getStudentsRegisteredByUser);
router.route('/register').post(authMiddleware_1.protect, authMiddleware_1.admin, studentController_1.registerStudent);
router.route('/forget-password').post(studentController_1.forgetPassword);
router.route('/reset-password').put(studentController_1.resetPassword);
router.route('/graduate').put(authMiddleware_1.protect, authMiddleware_1.admin, studentController_1.graduateStudent);
router.route('/auth').post(studentController_1.authStudent);
router
    .route('/:id')
    .get(authMiddleware_1.protect, studentController_1.getStudent)
    .put(authMiddleware_1.protect, studentController_1.updateStudent)
    .delete(authMiddleware_1.protect, studentController_1.deleteStudent);
exports.default = router;
