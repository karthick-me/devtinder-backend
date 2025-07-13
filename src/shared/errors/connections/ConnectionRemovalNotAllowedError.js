const AppError = require("../AppError");

class ConnectionRemovalNotAllowedError extends AppError {
    constructor(message = "Connection cannot be removed") {
        super(message, 400, "ConnectionRemovalNotAllowedError");
    }
}

module.exports = ConnectionRemovalNotAllowedError;
