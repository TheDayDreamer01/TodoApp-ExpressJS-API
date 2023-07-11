import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
import {
    notFound,
    errorHandler
} from "./middleware/errorMiddleware.js";


dotenv.config();
connectDB();    


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}/`);
});