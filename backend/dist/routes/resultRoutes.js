"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const resultController_1 = require("../controllers/resultController");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, resultController_1.getResults);
router.route('/:id').post(authMiddleware_1.protect, resultController_1.createResult).get(authMiddleware_1.protect, resultController_1.getResult);
router.route('/student/:id').get(authMiddleware_1.protect, resultController_1.getStudentResults);
exports.default = router;
