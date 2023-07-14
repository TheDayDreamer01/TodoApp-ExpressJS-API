import jwt from "jsonwebtoken";


const generateAccessToken = (response, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn : "1d"
    });

    response.cookie("access_token", token, {
       httpOnly : true, 
       secure : true, 
       sameSite : "strict",
       maxAge : 1000 * 60 * 60 * 24 
    });
};


const generateRefreshToken = (response, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn : "30d"
    });

    response.cookie("refresh_token", token, {
       httpOnly : true,
       secure : true, 
       sameSite : "strict",
       maxAge : 1000 * 60 * 60 * 24 * 30
    });
};

const deleteTokens = (request, response) => {
    request.user = null;
    response.cookie("access_token", "", {
        httpOnly : true,
        expires : new Date(0)
    });
    response.cookie("refresh_token", "", {
        httpOnly : true,
        expires : new Date(0)
    });
}

export {
    generateAccessToken,
    generateRefreshToken,
    deleteTokens
};