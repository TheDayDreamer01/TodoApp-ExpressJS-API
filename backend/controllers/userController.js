import asyncHandler from "express-async-handler";


const getUserProfile = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "user profile"
    })
});

const updateUserProfile = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "user profile"
    })
});

const updateUserPassword = asyncHandler( async (request, response) => {
    response.status(200).json({
        message : "update password"
    })
});

const deleteUserProfile = asyncHandler( async(request, response) => {
    response.status(200).json({
        message : "user profile"
    })
});


export {
    getUserProfile,
    updateUserPassword,
    updateUserProfile,
    deleteUserProfile
};