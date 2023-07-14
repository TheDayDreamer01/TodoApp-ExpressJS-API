import express from "express"; 
import {
    getUserTasks,
    createUserTask,
    getUserTask,
    deleteUserTask,
    updateUserTask, 
    resolveUserTask
} from "../controllers/todoController.js";
import { authRequired } from "../middleware/authMiddleware.js";


const todoRouter = express();


todoRouter.route("/:username")
    .get(authRequired, getUserTasks) 
    .post(authRequired, createUserTask);

todoRouter.route("/:username/:task")
    .get(authRequired, getUserTask)
    .put(authRequired, updateUserTask)
    .patch(authRequired, resolveUserTask)
    .delete(authRequired, deleteUserTask);

    
export default todoRouter;