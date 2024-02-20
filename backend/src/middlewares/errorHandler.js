import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, _next) => {
    // eslint-disable-next-line no-console
    console.log("errorHandler", err);
    let statusCode = 500;
    let message = "Internal Server Error";
    let location = "Unknown";
    let type = "AppError";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        type = "AppError";
        location = err.location;
    } else if (err.name === "ValidationError") {
        statusCode = 422;
        message = err.message;
        type = "ValidationError";
        location = err.stack.split("\n")[1].trim();
    } else if (err.name === "MongoServerError") {
        // Mongoose validation error
        statusCode = 400;
        message = err.message;
        type = "MongoServerError";
        location = err.stack.split("\n")[1].trim();
    } else if (err instanceof SyntaxError) {
        // Syntax error in JSON request
        statusCode = 400;
        message = "Invalid JSON syntax";
        type = "SyntaxError";
        location = err.stack.split("\n")[1].trim();
    }
    if (err instanceof TypeError) {
        message = err.message;
        type = "TypeError";
        location = err.stack.split("\n")[1].trim();
    } else if (err instanceof ReferenceError) {
        message = err.message;
        type = "ReferenceError";
        location = err.stack.split("\n")[1].trim();
    } else if (err instanceof RangeError) {
        message = err.message;
        type = "RangeError";
        location = err.stack.split("\n")[1].trim();
    }
    logger.error(`${type}:-${statusCode}: ${message} at ${location}`);
    res.status(statusCode).json({
        success: false,
        error: message,
        type,
        // TODO only send error stack in development
        data: null,
        info: location,
    });
};

export default errorHandler;
