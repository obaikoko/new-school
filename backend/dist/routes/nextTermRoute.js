"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const nextTermController_1 = require("../controllers/nextTermController");
const router = express_1.default.Router();
router.route('/').get(nextTermController_1.getNextTermInfo).put(authMiddleware_1.protect, authMiddleware_1.admin, nextTermController_1.addNextTermInfo);
exports.default = router;
