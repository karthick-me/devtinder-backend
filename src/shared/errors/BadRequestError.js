const AppError = require("./AppError");

class BadRequestError extends AppError {
    constructor(message = "bad request error") {
        super(message, 401, "BadRequestError");
    }
}

module.exports = BadRequestError;
