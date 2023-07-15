import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import { generateHash } from "../utils/hashGenerator.js";
import { deleteTokens } from "../utils/tokenGenerator.js";


const getUserProfile = asyncHandler( async(request, response) => {
    response.status(200).json({
        user : request.user
    });
});

const updateUserProfile = asyncHandler( async(request, response) => {
    const { username, bio } = request.body;

    const updatedUser = await userModel.updateOne(
        { _id : request.user._id },
        { $set : {
            username : username || request.user.username,
            bio : bio
        }}
    );

    if (updatedUser.modifiedCount === 0) throw new Error("Something went wrong");

    response.status(200).json({
        message : "Successfully updated profile"
    });

});

const updateUserPassword = asyncHandler( async (request, response) => {
    const { old_password, new_password } = request.body;

    const user = await userModel.findOne(request.user);
    if (await user.checkPassword(old_password)){
        
        if (new_password.length < 6){
            response.status(401);
            throw new Error("Password must at least be 6 characters long");
        }

        const password = await generateHash(new_password);
        
        const updatedUser = await userModel.updateOne(
            { _id : request.user._id },
            { $set : { password : password} }
        );

        if (updatedUser.modifiedCount === 0) throw new Error("Something went wrong");

        response.status(200).json({
            message : "Successfully updated password"
        });
    }

    response.status(403);
    throw new Error("Incorrect password");
});

const deleteUserProfile = asyncHandler( async(request, response) => {

    const user = await userModel.findOne(request.user);
    await userModel.deleteOne(user);
    deleteTokens(request, response);
    
    response.status(200).json({
        message : "Successfully deleted user"
    });
});


export {
    getUserProfile,
    updateUserPassword,
    updateUserProfile,
    deleteUserProfile
};