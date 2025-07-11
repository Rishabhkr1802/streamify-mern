import express from 'express'
import { signup, login, logout, onBoard, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoutes } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup',  signup);
router.post('/login' ,  login);
router.post('/logout' , logout);

router.post('/onboarding', protectedRoutes, onBoard);
router.get('/me', protectedRoutes, checkAuth)

//forget-password
//send-forget-password-email

export default router;