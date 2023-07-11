import asyncHandler from "express-async-handler";

// GET /api/todo/:id
const getUserTasks = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "User Tasks"
    });
});


// POST /api/todo/:id/:task
const createUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "create User Tasks"
    });
});


// GET /api/todo/:id/:task
const getUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "get User Task"
    });
});


// DELETE /api/todo/:id/:task
const deleteUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "Delete User Tasks"
    });
});


// PUT /api/todo/:id/:task
const updateUserTask = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "Update User Tasks"
    });
});


// PATCH /api/todo/:id/:task
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