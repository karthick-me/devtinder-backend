const AppError = require("./AppError");

class ValidationError extends AppError {
    constructor(message = "Validation failed", field = null) {
        super(message, 400, "ValidationError", { field });
    }
}

module.exports = ValidationError;
