import express from "express";
import {
    getUserProfile,
    updateUserPassword,
    updateUserProfile,
    deleteUserProfile
} from "../controllers/userController.js";
import { authRequired } from "../middleware/authMiddleware.js";


const userRouter = express();


userRouter.route("/:id")
    .get(authRequired, getUserProfile)
    .put(authRequired, updateUserProfile)
    .patch(authRequired, updateUserPassword)
    .delete(authRequired, deleteUserProfile);


export default userRouter;