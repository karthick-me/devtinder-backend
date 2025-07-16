const { formatSuccessResponse } = require("../../shared/utils");
const { getChatThreads, getMessages } = require("./chat.service");
const asyncHandler = require("../../shared/utils/asyncHandler");

const getAllThreadController = asyncHandler(async function (request, response) {
    const userId = request.userId;

    const threads = await getChatThreads(userId);
    const successResponse = formatSuccessResponse({
        message: "Fetched all chat threads successfully",
        data: {
            threads,
        },
        statusCode: 200,
    });
    return response.status(200).json(successResponse);
});

const getMessagesController = asyncHandler(async function (request, response) {
    const userId = request.userId;
    const chatId = request.params.chatId;

    const messages = await getMessages(chatId, userId);
    const successResponse = formatSuccessResponse({
        message: "Messages fetched successfully",
        data: {
            messages,
        },
        statusCode: 200,
    });

    return response.status(200).json(successResponse);
});

module.exports = { getAllThreadController, getMessagesController };
