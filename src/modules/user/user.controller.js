const {
    formatSuccessResponse,
    formatErrorResponse,
} = require("../../shared/utils");
const asyncHandler = require("../../shared/utils/asyncHandler");
const { getUserById, updateUserProfileById } = require("./user.service");

const getLoggedInUserController = asyncHandler(async function (
    request,
    response
) {
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
});

const updateUserProfileController = asyncHandler(async function (
    request,
    response
) {
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
});

module.exports = {
    getLoggedInUserController,
    updateUserProfileController,
};
