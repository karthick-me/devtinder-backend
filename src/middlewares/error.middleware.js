const formatErrorResponse = require("../shared/utils/formatErrorResponse");

const errorMiddleware = function (error, request, response, next) {
    const statusCode = error.statusCode || 500;
    const errorResponse = formatErrorResponse(error);
    response.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
