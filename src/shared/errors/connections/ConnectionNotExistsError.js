const AppError = require("../AppError");

class ConnectionNotExistsError extends AppError {
    constructor(message = "Connection does not exist") {
        super(message, 400, "ConnectionNotExistsError");
    }
}

module.exports = ConnectionNotExistsError;
