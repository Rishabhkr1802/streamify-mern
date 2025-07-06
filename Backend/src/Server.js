import dotenv       from "dotenv";
import express      from "express";
import cookieparser from 'cookie-parser';

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 3000;
const app  = express();

app.listen(port, () => console.log(`Server is running at ${port}`));