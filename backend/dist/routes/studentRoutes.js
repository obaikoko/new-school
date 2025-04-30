"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controllers/studentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/register').post(authMiddleware_1.protect, authMiddleware_1.admin, studentController_1.registerStudent);
// router.route('/auth').post(authStudent);
exports.default = router;
