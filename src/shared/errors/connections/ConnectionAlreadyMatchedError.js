const AppError = require("../AppError");

class ConnectionAlreadyMatchedError extends AppError {
    constructor(message = "Users are already matched") {
        super(message, 400, "ConnectionAlreadyMatchedError");
    }
}

module.exports = ConnectionAlreadyMatchedError;
