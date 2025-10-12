import { generateStreamToken } from "../utils/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user._id);
        return res.status(200).json({success: true, token});
    } catch (error) {
        console.error("Error occuring in chat Controller : ", error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}