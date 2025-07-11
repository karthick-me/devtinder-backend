const AppError = require("./AppError");

class UserNotFoundError extends AppError {
    constructor(message = "User not found") {
        super(message, 404, "UserNotFoundError");
    }
}

module.exports = UserNotFoundError;
