import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { createStreamUser } from "../utils/stream.js";

export async function signup(req, res, next) {
    const { fullName, email, password } = req.body;
    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters." })
        }

        if (!emailRegrex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email format." })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "email already exists. Please use a different email." })
        }

        const randomNumber = Math.floor(Math.random() * 100) + 1; //generate random number for pickup diff avatar image
        const randomAvatar = `https://avatar.iran.liara.run/public/${randomNumber}.png;`

        const newUser = await User.create({ email, password, fullName, profilePic: randomAvatar });

        //Also Create a user for stream app for authorization
        try{
            await createStreamUser({id: newUser._id, name: newUser.fullName, image: newUser.profilePic || ""});
            console.log("Stream User has Created for : ", newUser.fullName);
        } catch (error) {
            console.error("Error fetch during creation in stream client user: ", error);
        }

        //Generating JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("jwt", token, {
            maxAge: 24 * 7 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", //prevent HTTP requests
            // secure: true,
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(201).json({ success: true, message: "User create successfully", user: newUser });

    } catch (error) {
        console.error("Error occuring in signup Controller : ", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function login(req, res, next) {
    const { email, password } = req.body;
    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 character" });
        }
        if (!emailRegrex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email" }); //User not found
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid password" }); //User not found   
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("jwt", token, {
            maxAge: 24 * 7 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", //prevent HTTP requests
            // secure: true,
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(200).json({ success: true, message: "Login successfully", user, token });

    } catch (error) {
        console.error("Error occuring in Login controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export function logout(req, res, next) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout successfully" });
}

export async function onBoard(req, res, next) {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(401).json({success: false, message: "All fields are required",
                missingFields: [
                    !fullName && 'fullName',
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            })
        }
        
        const updateUser = await User.findByIdAndUpdate(userId, {...req.body, isOnboarded: true}, {new: true});
        if (!updateUser) {
            return res.status(401).json({success: false, message: "User not found"});
        }

        //Update user info on stream panel
        try{
            await createStreamUser({id: updateUser._id, name: updateUser.fullName, image: updateUser.profilePic || ""});
            console.log("Stream User has Updated for : ", updateUser.fullName);
        } catch (error) {
            console.error("Error fetch during updation in stream client user: ", error);
        }

        return res.status(200).json({success: true, message: "User has updated successfully", user: updateUser});
        
    } catch (error) {
        console.error("Error occuring in onBoard controller : ", error);
        return res.status(500).json("Something went wrong");
    }
}

export function checkAuth(req, res) {
    return res.status(200).json({user: req.user});
}