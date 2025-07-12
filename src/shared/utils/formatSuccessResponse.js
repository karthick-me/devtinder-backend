const formatSuccessResponse = ({
    message = "",
    data = {},
    statusCode = 200,
}) => {
    return {
        success: true,
        message,
        data,
        statusCode,
        timestamp: new Date().toISOString(),
    };
};

module.exports = formatSuccessResponse;
