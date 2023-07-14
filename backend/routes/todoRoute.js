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
import todoExists from "../middleware/todoMiddleware.js";


const todoRouter = express();


todoRouter.route("/:username")
    .get(authRequired, getUserTasks) 
    .post(authRequired, createUserTask);

todoRouter.route("/:username/:title")
    .get(authRequired, todoExists, getUserTask)
    .put(authRequired, todoExists, updateUserTask)
    .patch(authRequired, todoExists, resolveUserTask)
    .delete(authRequired, todoExists, deleteUserTask);

    
export default todoRouter;