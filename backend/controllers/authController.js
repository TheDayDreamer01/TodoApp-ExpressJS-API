import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import {
    generateAccessToken,
    generateRefreshToken,
    deleteTokens
} from "../utils/tokenGenerator.js";


const signInUser = asyncHandler( async (request, response) => {

    const { email, password } = request.body;

    const user = await userModel.findOne({email});

    if (!user){
        response.status(404);
        throw new Error("User does not exists");
    }

    if (await user.checkPassword(password)){
        generateAccessToken(response, user._id);
        generateRefreshToken(response, user._id);
        response.status(200).json({
            message : "Successfully logged in",
            user : {
                username : user.username,
                email : user.email
            }
        });
    }

    response.status(403);
    throw new Error("Incorrect password");
});

const signUpUser = asyncHandler( async (request, response) => {

    const { username, email, password } = request.body;

    const user = await userModel.findOne({ username, email });
    if (user) {
        response.status(401);
        throw new Error("User already Exists");
    }

    if (password.length < 6){
        response.status(401);
        throw new Error("Password must at least be 6 characters long");
    }

    const newUser = await userModel.create({
        username : username,
        email : email,
        password : password
    });

    if (newUser) {
        generateAccessToken(response, newUser._id);
        generateRefreshToken(response, newUser._id);
        response.status(200).json({
            message : "Successfully created",
            user : {
                username : newUser.username,
                email : newUser.email
            }
        });
    } else {
        response.status(403);
        throw new Error("Failed to create user");
    }
});

const signOutUser = asyncHandler( async (request, response) => {
    try{
        deleteTokens(request, response);
        response.status(200).json({
            message : "Successfully logged out"
        });
    } catch (error){
        response.status(400);
        throw new Error("Failed to logged out");
    } 
});

const refreshToken = asyncHandler( async (request, response) => {
    try {
        generateAccessToken(response, request.user._id);
        response.status(200).json({
            message : "Refreshed token"
        });
    } catch (error){ 
        response.status(400);
        throw new Error("Failed to generate access token");
    }
});

export {
    signInUser,
    signUpUser,
    signOutUser, 
    refreshToken
};