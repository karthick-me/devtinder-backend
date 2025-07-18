const Chat = require("./chat.model");
const Message = require("../messages/message.model");

//TODO : later if we any chatname for user use that but now use firstname
const findAllChatsByUserId = async function (userId) {
    const allChats = await Chat.find({
        participants: userId,
        archivedBy: { $ne: userId },
    })
        .sort({ updatedAt: -1 })
        .populate("participants", "_id firstName lastName photoUrl")
        .populate(
            "lastMessage",
            "_id sender receiver content messageType status createdAt"
        );
    return allChats;
};

const findChatByUserId = async function (
    chatId,
    userId,
    { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "asc" } = {}
) {
    const skip = (page - 1) * limit;

    const messages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
        chatId,
    })
        .sort({ [sortBy]: sortOrder === "asc" ? -1 : 1 })
        .skip(skip)
        .limit(limit);

    return messages;
};

const saveMessage = async function (message) {
    const newMessage = new Message(message);
    return await newMessage.save();
};

const updateLastMessage = async function (chatId, messageId) {
    return await Chat.findOneAndUpdate(
        { chatId },
        { lastMessage: messageId },
        { new: true }
    );
};

const resetUnread = async function (chatId, userId) {
    return await Chat.findOneAndUpdate(
        { chatId },
        { $set: { [`unreadCount.${userId}`]: 0 } },
        { new: true }
    );
};

const incrementUnread = async function (chatId, userId) {
    return await Chat.findOneAndUpdate(
        { chatId },
        { $inc: { [`unreadCount.${userId}`]: 1 } },
        { new: true }
    );
};

const softDeleteMessageForUser = async function (messageId, chatId, userId) {
    return await Message.findOneAndUpdate(
        {
            _id: messageId,
            chatId,
            $or: [{ sender: userId }, { receiver: userId }],
        },
        {
            $addToSet: { deletedFor: userId },
        },
        { new: true }
    );
};

module.exports = {
    findAllChatsByUserId,
    findChatByUserId,
    saveMessage,
    updateLastMessage,
    resetUnread,
    incrementUnread,
    softDeleteMessageForUser,
};
