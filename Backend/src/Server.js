import dotenv       from "dotenv";
import express      from "express";
import cookieparser from "cookie-parser";
import cors         from "cors";
import authRouter   from "./router/auth.routes.js";
import userRouter   from "./router/user.routes.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 3000;
const app  = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.0.103:3000']
}));

app.use(express.json({limit: '20kb'})) //For Accept form input
app.use(express.urlencoded({extended: 'false', limit: '20kb'})) //For Accept data from URL like id,queryParams etc
app.use(express.static("uploads"));
app.use(cookieparser());

app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);

app.listen(port, () => console.log(`Server is running at ${port}`));