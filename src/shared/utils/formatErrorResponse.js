const formatErrorResponse = (error) => {
    const statusCode = error.statusCode || 500;
    const errorType = error.type || "InternalServerError";
    const details = error.details || null;
    const message = error.message || "Something went wrong";

    return {
        success: false,
        message,
        error: {
            type: errorType,
            details,
        },
        statusCode,
        timestamp: new Date().toISOString(),
    };
};

module.exports = formatErrorResponse;
