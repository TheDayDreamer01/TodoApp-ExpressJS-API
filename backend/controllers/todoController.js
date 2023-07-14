import asyncHandler from "express-async-handler";
import todoModel from "../models/todoModel.js";

// GET /api/todo/:username
const getUserTasks = asyncHandler( async(request, response) => {
    
    const tasks = await todoModel.find({ user_id : request.user._id });

    response.status(200).json({
        TodoList : tasks
    });
});


// POST /api/todo/:username/:task
const createUserTask = asyncHandler( async(request, response) => {
    const { title, description, notes } = request.body;
    
    const task = await todoModel.findOne({ title });

    if (task) {
        response.status(401);
        throw new Error("Task already exists");
    }

    if (title === undefined || title === "") {
        response.status(401);
        throw new Error("Please enter a valid Title");
    }

    const newTask = await todoModel.create({
        user_id : request.user._id,
        title : title, 
        description : description, 
        notes : notes
    });

    response.status(200).json({
        message : "Successfully created",
        data : newTask
    });
});


// GET /api/todo/:username/:task
const getUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "get User Task"
    });
});


// DELETE /api/todo/:username/:task
const deleteUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "Delete User Tasks"
    });
});


// PUT /api/todo/:username/:task
const updateUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "Update User Tasks"
    });
});


// PATCH /api/todo/:username/:task
const resolveUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "Resolve User Tasks"
    });
});


export {
    getUserTasks,
    createUserTask,
    getUserTask,
    deleteUserTask,
    updateUserTask, 
    resolveUserTask
};