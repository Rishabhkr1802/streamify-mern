import FriendRequest from "../models/FriendRequest.model.js";
import User from "../models/User.model.js";

export async function getRecommendedUsers(req, res) {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    try {
        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, //ne- not equal to : exclude current user
                { id: { $nin: currentUser.friends } }, //nin- not in : exclude current user friends
                { isOnboarded: true }
            ]
        })

        return res.status(200).json({ success: true, message: "Get All recommended User", recommendedUsers })
    } catch (error) {
        console.error("Error occuring during fetching get recommended controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function getMyFriends(req, res) {
    const userId = req.user.id;
    try {
        const userFriends = await User.findById({ userId }).select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage"); //friend key only hold id's of friend so populate() return the data of the respected ids

        return res.status(200).json({ success: true, message: "Fetch all friends", friends: userFriends.friends });
    } catch (error) {
        console.error("Error occuring during fetching friends controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        //Prevent sendRequest to yourself;
        if (myId === recipientId) {
            return res.status(400).json({ success: false, message: "You can't send friend request to yourself" });
        }

        const recipient = await FriendRequest.findById({ recipientId });
        if (!recipient) {
            return res.status(400).json({ success: false, message: "Recipient not found" });
        }

        //Check user has already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ success: false, message: "You are already friends with this user" });
        }

        //Check user has already sent friend request
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });
        if (existingRequest) {
            return res.status(400).json({ success: false, message: "A friends request already exists between you and this user" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId, recipient: recipientId
        });

        return res.status(201).json({ success: true, message: "Friend Request sent successfully", friendRequest })
    } catch (error) {
        console.error("Error occuring during sending friend request controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const currentUserId = req.user.id
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById({ requestId });
        if (!friendRequest) {
            return res.status(404).json({ success: false, message: "Friend Request not found" });
        }

        //Verify the current user is the recipient
        if (friendRequest.recipient.toString() !== currentUserId) {
            return res.status(403).json({ success: false, message: "You are not authorized to accept this request" });
        }

        friendRequest.status = "accepted";
        await FriendRequest.save();

        //add each user to the other 's friends arrays 
        //$addToSet: adds elements to an array only if they do not already exist.
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        })

    } catch (error) {
        console.error("Error occuring during accepting friend request controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function getFriendRequests(req, res){ 
    try {
        const incomingRequest = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName nativeLanguage learningLanguage profilePic");

        const acceptedRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        return res.status(200).json({success: true, message: "Get friend Requests", incomingRequest, acceptedRequest});
    } catch (error) {
        console.error("Error occuring during getting friend request controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function getOutgoingFriendRequests(req, res){ 
    try {
        const outgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName nativeLanguage learningLanguage profilePic");

        return res.status(200).json({success: true, message: "Get outgoing Friend Requests", outgoingRequest});
    } catch (error) {
        console.error("Error occuring during getting outgoing friend request controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}