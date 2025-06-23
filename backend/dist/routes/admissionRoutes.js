"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admission_controller_1 = require("../controllers/admission-controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').post(admission_controller_1.createAdmission).get(authMiddleware_1.protect, authMiddleware_1.admin, admission_controller_1.getAllRequest);
router
    .route('/:id')
    .get(authMiddleware_1.protect, authMiddleware_1.admin, admission_controller_1.getSingleRequest)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, admission_controller_1.sendMail)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, admission_controller_1.deleteAdmission);
exports.default = router;
