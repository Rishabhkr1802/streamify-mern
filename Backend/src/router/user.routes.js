import express from 'express'
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } from "../controllers/user.controller.js";
import { protectedRoutes } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectedRoutes); //Applied middleware for all routes below 
router.get('/get-recommended-user', getRecommendedUsers);
router.get('/friends' , getMyFriends);

router.post('/friend-request/:id' , sendFriendRequest);
router.put('/friend-request/:id/accept' , acceptFriendRequest);
router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);

export default router;