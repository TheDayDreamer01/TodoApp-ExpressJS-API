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

    const title = request.params.title;

    const task = await todoModel.findOne({ title : title });
    response.status(200).json({
        Task : task
    });
});


// DELETE /api/todo/:username/:task
const deleteUserTask = asyncHandler( async(request, response) => {
    
    const title = request.params.title;

    await todoModel.deleteOne({ title : title });
    response.status(200).json({
        message : "Successfully deleted task"
    });
});


// PUT /api/todo/:username/:task
const updateUserTask = asyncHandler( async(request, response) => {

    const taskTitle = request.params.title;
    const { title, description, notes } = request.body;

    if (title !== undefined){
        if (await todoModel.findOne({title : title})){
            response.status(401);
            throw new Error(`Task '${title}' already exists`);
        }
    } 

    const updatedTask = await todoModel.updateOne(
        { title : taskTitle }, 
        { $set : {
            title : title || taskTitle , 
            description : description,
            notes : notes
        }});

    if (updatedTask.modifiedCount === 0){
        response.status(401);
        throw new Error("Cannot modify values");
    }

    response.status(200).json({
        message : "Successfully updated"
    });
});


// PATCH /api/todo/:username/:task
const resolveUserTask = asyncHandler( async(request, response) => {

    const title = request.params.title;

    const task = await todoModel.findOne({ title : title });
    const isCheck = task.is_check;

    await todoModel.updateOne(
        { title : title },
        { $set : {
            is_check : !isCheck
        }}
    );
    response.status(200).json({
        message : (!isCheck) ? 
            "Check task" : "Uncheck task"
    })
});


export {
    getUserTasks,
    createUserTask,
    getUserTask,
    deleteUserTask,
    updateUserTask, 
    resolveUserTask
};