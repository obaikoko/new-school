"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const staff_controller_1 = require("../controllers/staff-controller");
const router = express_1.default.Router();
router
    .route('/')
    .get(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.getAllStaff)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.registerStaff);
router.route('/data').get(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.staffData);
router
    .route('/:id')
    .get(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.getStaff)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.updateStaff)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, staff_controller_1.deleteStaff);
exports.default = router;
