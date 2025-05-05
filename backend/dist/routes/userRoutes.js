"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUsers);
router.route('/register').post(userController_1.registerUser);
router.route('/auth').post(userController_1.authUser);
router.post('/mails', authMiddleware_1.protect, authMiddleware_1.admin, userController_1.sendMail);
router.post('/logout', userController_1.logoutUser);
router.route('/forget-password').post(userController_1.forgetPassword);
router.route('/reset-password').put(userController_1.resetPassword);
router.route('/profile').get(authMiddleware_1.protect, userController_1.getUserProfile);
router
    .route('/:id')
    .get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUserById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.updateUser)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.deleteUser);
exports.default = router;
