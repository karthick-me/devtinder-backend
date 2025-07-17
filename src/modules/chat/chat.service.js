const {
    findAllChatsByUserId,
    findChatByUserId,
    saveMessage,
    updateLastMessage,
    incrementUnread,
    resetUnread,
} = require("./chat.repository");
const { validateUserById } = require("../../shared/validators");

//TODO : Implement validate chat by id

async function getChatThreads(userId) {
    validateUserById(userId);
    return await findAllChatsByUserId(userId);
}

async function getMessages(chatId, userId) {
    validateUserById(userId);
    return await findChatByUserId(chatId, userId);
}

async function sendMessage(senderId, receiverId, chatId, content) {
    validateUserById(senderId);
    validateUserById(receiverId);
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
    validateUserById(userId);

    return await resetUnread(chatId, userId);
}

module.exports = { getChatThreads, getMessages, sendMessage, markAsRead };
