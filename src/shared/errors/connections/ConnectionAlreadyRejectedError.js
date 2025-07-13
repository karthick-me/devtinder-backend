const AppError = require("../AppError");

class ConnectionAlreadyRejectedError extends AppError {
    constructor(message = "Connection already rejected") {
        super(message, 400, "ConnectionAlreadyRejectedError");
    }
}

module.exports = ConnectionAlreadyRejectedError;
