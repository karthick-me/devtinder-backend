const AppError = require("./AppError");
const UserNotFoundError = require("./auth/UserNotFoundError");
const InvalidPasswordError = require("./auth/InvalidPasswordError");
const ValidationError = require("./auth/ValidationError");
const DatabaseConnectionError = require("./db/DatabaseConnectionError");
const DuplicationFieldError = require("./auth/DuplicationFieldError");
const ConnectionAlreadyExistsError = require("./connections/ConnectionAlreadyExistsError");

module.exports = {
    AppError,
    UserNotFoundError,
    InvalidPasswordError,
    ValidationError,
    DatabaseConnectionError,
    DuplicationFieldError,
    ConnectionAlreadyExistsError,
};
