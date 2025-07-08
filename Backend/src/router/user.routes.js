import express from 'express'
import { getAllUsers, getUSerById } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/get-all-user', getAllUsers);
router.get('/get-user-id' , getUSerById);

export default router;