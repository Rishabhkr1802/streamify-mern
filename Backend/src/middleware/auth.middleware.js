import jwt from "jsonwebtoken";
import User from "../models/User.model.js"

export async function protectedRoutes(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({success: false, message: "Unauthorized - No token provided"});
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decodeToken) {
            return res.status(401).json({success: false, message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decodeToken.userId).select("-password");
        if(!user) {
            return res.status(401).json({success: false, message: "Unauthorized - User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error occurs in auth middleware',error);
        return res.status(500).json('Internal server error');
    }
}