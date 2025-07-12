const AppError = require("../AppError");

class InvalidConnectionStatusError extends AppError {
    constructor(message = "Invalid connection status") {
        super(message, 400, "InvalidConnectionStatusError");
    }
}

module.exports = InvalidConnectionStatusError;
