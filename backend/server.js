import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import connectDB from "./config/db.js";


dotenv.config();
connectDB();    


const app = express();
const port = process.env.PORT || 5000;


app.use("/api/auth", authRouter);


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}/`);
});