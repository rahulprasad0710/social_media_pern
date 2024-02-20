class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.location = this.stack.split("\n")[1].trim();
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
