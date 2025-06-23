"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const data_controller_1 = require("../controllers/data-controller");
const router = express_1.default.Router();
router.route('/students').get(authMiddleware_1.protect, authMiddleware_1.admin, data_controller_1.studentsData);
router.route('/users').get(authMiddleware_1.protect, authMiddleware_1.admin, data_controller_1.userData);
exports.default = router;
