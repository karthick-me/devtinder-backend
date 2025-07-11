const AppError = require("./AppError");

class DatabaseConnectionError extends AppError {
    constructor(message = "Database connection failed") {
        super(message, 500, "DatabaseConnectionError");
    }
}

module.exports = DatabaseConnectionError;
