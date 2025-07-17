const { formatSuccessResponse } = require("../../shared/utils");
const {
    getChatThreads,
    getMessages,
    sendMessage,
    markAsRead,
} = require("./chat.service");
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

const sendMessageController = asyncHandler(async function (request, response) {
    const chatId = request.params.chatId;
    const senderId = request.userId;
    const { receiverId, content } = request.body;

    const savedMessage = await sendMessage(
        senderId,
        receiverId,
        chatId,
        content
    );
    const successResponse = formatSuccessResponse({
        message: "Message sent and saved successfully",
        data: {
            message: savedMessage,
        },
        statusCode: 201,
    });
    return successResponse.statusCode(201).json(successResponse);
});

const markAsReadController = asyncHandler(async function (request, response) {
    const chatId = request.params.chatId;
    const userId = request.userId;
    const updatedChat = await markAsRead(chatId, userId);
    const successResponse = formatSuccessResponse({
        message: "Marked as read",
        data: {
            chat: updatedChat,
        },
        statusCode: 200,
    });
    return response.status(200).json(successResponse);
});

module.exports = {
    getAllThreadController,
    getMessagesController,
    sendMessageController,
    markAsReadController,
};
