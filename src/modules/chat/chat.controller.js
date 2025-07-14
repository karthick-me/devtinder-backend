const { formatSuccessResponse } = require("../../shared/utils");
const { getChatThreads } = require("./chat.service");
const asyncHandler = require("../../shared/utils/asyncHandler");

const getAllThreadController = asyncHandler(async function (request, response) {
    const userId = request.userId;

    const allThread = await getChatThreads(userId);
    const successResponse = formatSuccessResponse({
        message: "Fetched all chat threads successfully",
        data: {
            allThread,
        },
        statusCode: 200,
    });
    response.status(200).json(successResponse);
});

module.exports = { getAllThreadController };
