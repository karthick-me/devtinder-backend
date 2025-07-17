const AppError = require("../AppError");

class MessageNotFoundError extends AppError {
    constructor(message = "Message not found") {
        super(message, 404, "MessageNotFoundError");
    }
}

module.exports = MessageNotFoundError;
