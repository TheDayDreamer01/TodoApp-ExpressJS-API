import express from "express"; 
import {
    getUserTasks,
    createUserTask,
    getUserTask,
    deleteUserTask,
    updateUserTask, 
    resolveUserTask
} from "../controllers/todoController.js";


const todoRouter = express();


todoRouter.route("/:username")
    .get(getUserTasks) 
    .post(createUserTask);

todoRouter.route("/:username/:task")
    .get(getUserTask)
    .put(updateUserTask)
    .patch(resolveUserTask)
    .delete(deleteUserTask);

    
export default todoRouter;