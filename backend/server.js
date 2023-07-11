import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";

dotenv.config();
connectDB();    


const app = express();
const port = process.env.PORT || 5000;


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}/`);
});