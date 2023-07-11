import express from "express";
import {
    getUserProfile,
    updateUserPassword,
    updateUserProfile,
    deleteUserProfile
} from "../controllers/userController.js";


const userRouter = express();


userRouter.route("/:id")
    .get(getUserProfile)
    .put(updateUserProfile)
    .patch(updateUserPassword)
    .delete(deleteUserProfile);


export default userRouter;