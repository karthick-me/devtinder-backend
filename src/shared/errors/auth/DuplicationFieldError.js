const AppError = require("../AppError");

class DuplicationFieldError extends AppError {
    constructor(message = "Duplicate field value", field = null) {
        super(message, 400, "DuplicationFieldError", { field });
    }
}

module.exports = DuplicationFieldError;
