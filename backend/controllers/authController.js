import asyncHandler from "express-async-handler";


const signInUser = asyncHandler( async (request, response) => {
    response.status(200).json({
        message : "Sign In"
    });
});

const signUpUser = asyncHandler( async (request, response) => {
    response.status(200).json({
        message : "Sign up"
    });
});

const signOutUser = asyncHandler( async (request, response) => {
    response.status(200).json({
        message : "Sign out"
    });
});

const refreshToken = asyncHandler( async (request, response) => {
    response.status(200).json({
        message : "refresh token"
    });
});

export {
    signInUser,
    signUpUser,
    signOutUser, 
    refreshToken
};