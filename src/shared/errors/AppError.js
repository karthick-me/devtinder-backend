class AppError extends Error {
    constructor(message, statusCode, type = "AppError", details = null) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
