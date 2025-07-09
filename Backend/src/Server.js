import dotenv       from "dotenv";
import express      from "express";
import cookieparser from 'cookie-parser';
import authRouter   from "./router/auth.routes.js";
import userRouter   from "./router/user.routes.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 3000;
const app  = express();

app.use(express.json({limit: '20kb'})) //For Accept form input
app.use(express.urlencoded({extended: 'false', limit: '20kb'})) //For Accept data from URL like id,queryParams etc
app.use(express.static("uploads"))

app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);

app.listen(port, () => console.log(`Server is running at ${port}`));