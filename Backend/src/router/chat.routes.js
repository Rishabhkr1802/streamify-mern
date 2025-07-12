import express from "express";
import { protectedRoutes } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protectedRoutes);
router.get('token', getStreamToken)

export default router;