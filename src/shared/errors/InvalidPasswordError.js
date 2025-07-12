const AppError = require("./AppError");

class InvalidPasswordError extends AppError {
    constructor(message = "Invalid password") {
        super(message, 401, "InvalidPasswordError");
    }
}
