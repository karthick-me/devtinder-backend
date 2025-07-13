const {
    formatSuccessResponse,
    formatErrorResponse,
} = require("../../shared/utils");
const { getUserById, updateUserProfileById } = require("./user.service");

const getLoggedInUserController = async function (request, response) {
    try {
        const userId = request.userId;
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

const updateUserProfileController = async function (request, response) {
    try {
        const userId = request.userId;
        const user = await updateUserProfileById(userId, request.body);

        const successResponse = formatSuccessResponse({
            message: "User profile updated successfully",
            data: {
                user,
            },
            statusCode: 200,
        });
        response.status(200).json(successResponse);
    } catch (error) {
        const errorResponse = formatErrorResponse(error);
        return response.status(error.statusCode || 500).json(errorResponse);
    }
};

module.exports = {
    getLoggedInUserController,
    updateUserProfileController,
};
