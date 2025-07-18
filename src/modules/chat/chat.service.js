const {
    findAllChatsByUserId,
    findChatByUserId,
    saveMessage,
    updateLastMessage,
    incrementUnread,
    resetUnread,
    softDeleteMessageForUser,
} = require("./chat.repository");
const { validateUserById } = require("../../shared/validators");
const { MessageNotFoundError } = require("../../shared/errors");

//TODO : Implement validate chat by id

async function getChatThreads(userId) {
    await validateUserById(userId);
    return await findAllChatsByUserId(userId);
}

async function getMessages(chatId, userId) {
    await validateUserById(userId);
    return await findChatByUserId(chatId, userId);
}

async function sendMessage(senderId, receiverId, chatId, content) {
    await validateUserById(senderId);
    await validateUserById(receiverId);
    const message = {
        sender: senderId,
        receiver: receiverId,
        chatId,
        content,
    };
    const savedMessage = await saveMessage(message);
    const messageId = saveMessage._id;

    updateLastMessage(chatId, messageId);
    incrementUnread(chatId, receiverId);

    return savedMessage;
}

async function markAsRead(chatId, userId) {
    await validateUserById(userId);
    return await resetUnread(chatId, userId);
}

async function deleteMessageForUser(messageId, chatId, userId) {
    await validateUserById(userId);
    const message = await softDeleteMessageForUser(messageId, chatId, userId);
    if (!message) {
        throw new MessageNotFoundError(
            "No message found for the user in this chat"
        );
    }
    return message;
}

module.exports = {
    getChatThreads,
    getMessages,
    sendMessage,
    markAsRead,
    deleteMessageForUser,
};
