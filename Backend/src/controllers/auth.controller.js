import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

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
        console.log("Error occuring in signup Controller : ", error);
        res.status(500).json({ success: false, message: "Something went wrong" })
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
        return res.status(200).json({ success: true, message: "Login successfully", user });

    } catch (error) {
        console.log("Error occuring in Login controller : ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export function logout(req, res, next) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout successfully" });
}