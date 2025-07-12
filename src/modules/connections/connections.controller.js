const { sendConnectionRequest } = require("./connections.service");
const {
    formatSuccessResponse,
    formatErrorResponse,
} = require("../../shared/utils");

const sendConnectionRequestController = async function (request, response) {
    try {
        const initiatorId = request.userId;
        const receiverId = request.params.receiverId;

        const connection = await sendConnectionRequest(initiatorId, receiverId);

        const successResponse = formatSuccessResponse({
            message: "Connection request sent",
            data: { connection },
            statusCode: 201,
        });

        return response.status(201).json(successResponse);
    } catch (error) {
        const errorResponse = formatErrorResponse(error);
        return response.status(error.statusCode || 500).json(errorResponse);
    }
};

module.exports = { sendConnectionRequestController };
