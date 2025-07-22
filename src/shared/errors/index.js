const AppError = require("./AppError");
const UserNotFoundError = require("./auth/UserNotFoundError");
const InvalidPasswordError = require("./auth/InvalidPasswordError");
const ValidationError = require("./auth/ValidationError");
const DatabaseConnectionError = require("./db/DatabaseConnectionError");
const DuplicationFieldError = require("./auth/DuplicationFieldError");
const ConnectionAlreadyExistsError = require("./connections/ConnectionAlreadyExistsError");
const ConnectionNotExistsError = require("./connections/ConnectionNotExistsError");
const InvalidConnectionStatusError = require("./connections/InvalidConnectionStatusError");
const ConnectionAlreadyMatchedError = require("./connections/ConnectionAlreadyMatchedError");
const ConnectionAlreadyRejectedError = require("./connections/ConnectionAlreadyRejectedError");
const ConnectionRemovalNotAllowedError = require("./connections/ConnectionRemovalNotAllowedError");
const MessageNotFoundError = require("../errors/messages/MessageNotFoundError");
const BadRequestError = require("./BadRequestError");

module.exports = {
    AppError,
    UserNotFoundError,
    InvalidPasswordError,
    ValidationError,
    DatabaseConnectionError,
    DuplicationFieldError,
    ConnectionAlreadyExistsError,
    ConnectionNotExistsError,
    InvalidConnectionStatusError,
    ConnectionAlreadyMatchedError,
    ConnectionAlreadyRejectedError,
    ConnectionRemovalNotAllowedError,
    MessageNotFoundError,
    BadRequestError,
};
