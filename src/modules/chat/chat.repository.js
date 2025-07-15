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

module.exports = { findChatsByUserId, getMessages };
