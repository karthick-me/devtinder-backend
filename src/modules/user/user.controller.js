const {
    formatSuccessResponse,
    formatErrorResponse,
} = require("../../shared/utils");
const { getUserById } = require("./user.service");

const getLoggedInUserController = async function (request, response) {
    try {
        const { userId } = request;
        const user = await getUserById(userId);

        const successResponse = formatSuccessResponse({
            message: "User profile fetched successfully",
            data: {
                user,
            },
            statusCode: 200,
        });
        return response.status(200).json(successResponse);
    } catch (error) {
        const errorResponse = formatErrorResponse(error);
        return response.status(error.statusCode || 500).json(errorResponse);
    }
};

module.exports = { getLoggedInUserController };
