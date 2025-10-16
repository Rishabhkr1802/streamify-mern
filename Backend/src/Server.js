import dotenv       from "dotenv";
import express      from "express";
import cookieparser from "cookie-parser";
import cors         from "cors";
import path         from "path";        // For Deployment

import authRouter   from "./router/auth.routes.js";
import chatRouter   from "./router/chat.routes.js";
import userRouter   from "./router/user.routes.js";
import { connectDB } from "./db/database.config.js";

dotenv.config({
    path: "./.env",
}); // or import "dotenv/config";

const port = process.env.PORT || 3000;
const app  = express();

const __dirname = path.resolve();       // For Deployment

app.use(cors({
    origin: ['http://localhost:3000','http://192.168.0.101:3000'],
    credentials: true,
}));

app.use(express.json({limit: '20kb'})) //For Accept form input
app.use(express.urlencoded({extended: 'false', limit: '20kb'})) //For Accept data from URL like id,queryParams etc
app.use(express.static("uploads"));
app.use(cookieparser());

app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chat',  chatRouter);

// For Deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
    connectDB();
});