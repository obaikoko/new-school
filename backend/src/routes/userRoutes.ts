import { registerUser } from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.route('/register').post(registerUser);

export default router;
