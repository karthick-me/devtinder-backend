const AppError = require("../AppError");

class ConnectionAlreadyExistsError extends AppError {
    constructor(message = "Connection already exists") {
        super(message, 400, "ConnectionAlreadyExistsError");
    }
}

module.exports = ConnectionAlreadyExistsError;
