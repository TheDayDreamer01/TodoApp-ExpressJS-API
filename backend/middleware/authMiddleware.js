import aysncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const authRequired = aysncHandler( async (request, response, next) => {
    
    const token = request.cookies.access_token;
    if (token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const exactUser = await userModel.findOne({
                _id : decode.userId, username : request.params.username }).select("-password");

            if (!exactUser) throw new Error();
            
            request.user = exactUser;
            next();
        } catch (error){
            response.status(401);
            throw new Error("Invalid token");
        }
    } else {
        response.status(404);
        throw new Error("Token not found");
    }
});  

const refreshRequired = aysncHandler( async (request, response, next) => {
    const token = request.cookies.refresh_token;
    if (token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await userModel.findById(decode.userId);
            
            if (!user){
                response.status(401);
                throw new Error("Invalid refresh token");
            }
            next();
        } catch (error){
            response.status(401);
            throw new Error("Invalid token");
        }
    } else {
        response.status(404);
        throw new Error("Token not found");
    }
});


export { 
    authRequired,
    refreshRequired
};