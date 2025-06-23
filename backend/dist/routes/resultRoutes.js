"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const resultController_1 = require("../controllers/resultController");
const router = express_1.default.Router();
router.route('/positions').post(authMiddleware_1.protect, resultController_1.generatePositions);
router.route('/broadsheet').post(authMiddleware_1.protect, resultController_1.generateBroadsheet);
router.route('/payment').put(authMiddleware_1.protect, resultController_1.updateResultPayment);
router
    .route('/subjects')
    .put(authMiddleware_1.protect, resultController_1.manualSubjectRemoval)
    .post(authMiddleware_1.protect, resultController_1.addSubjectToResults);
router.route('/data').get(authMiddleware_1.protect, resultController_1.resultData);
router.route('/pdf').get(resultController_1.exportManyResults);
router
    .route('/:id')
    .post(authMiddleware_1.protect, resultController_1.createResult)
    .get(authMiddleware_1.protect, resultController_1.getResult)
    .put(authMiddleware_1.protect, resultController_1.updateResult)
    .delete(authMiddleware_1.protect, resultController_1.deleteResult);
router.route('/student/:id').get(authMiddleware_1.protect, resultController_1.getStudentResults);
router.route('/pdf/:id').get(resultController_1.exportResult);
router.route('/').get(authMiddleware_1.protect, resultController_1.getResults);
exports.default = router;
