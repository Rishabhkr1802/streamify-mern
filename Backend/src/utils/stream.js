import { StreamChat } from "stream-chat";
import "dotenv/config";

const streamApiKey    = process.env.STREAM_API_KEY;
const streamApiSecret = process.env.STREAM_API_SECRET;

if (!streamApiKey || !streamApiSecret) {
    console.error("Error Occured stream api key & secret is missing");
}

const streamClient = StreamChat.getInstance(streamApiKey, streamApiSecret);

export async function createStreamUser(userData) {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error occuring duirng creating a stream client user :", error)
    }
}

export function generateStreamToken(userId) {
    try {
        //ensure userId is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error occuring in generating token in middleware : ", error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}