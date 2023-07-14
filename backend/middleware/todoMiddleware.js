import asyncHandler from "express-async-handler";
import todoModel from "../models/todoModel.js";


const todoExists = asyncHandler( async (request, response, next) => {
    const title = request.params.title;

    const task = await todoModel.findOne({ title : title });

    if (!task){
        response.status(404);
        throw new Error(`Task '${title}' not found`);
    }
    next()    
});

export default todoExists;