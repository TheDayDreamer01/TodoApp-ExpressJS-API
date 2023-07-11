
const notFound = (request, response, next) => {
    const error = new Error(`'${request.originalUrl}' Route Not Found`);
    response.status(404);
    next(error);
};


const errorHandler = (error, request, response, next) => {
    const environment = process.env.NODE_ENV || "development";
    const message = error.message || "Internal server error";
    const statusCode = error.status || 500;
    
    response.status(statusCode).json({
        message : message,
        stack : environment === "production" ?
            null : error.stack
    });
};


export {
    notFound, 
    errorHandler
};