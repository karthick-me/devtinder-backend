const Chat = require("./chat.model");

//TODO : later if we any chatname for user use that but now use firstname
const findChatsByUserId = async function (userId) {
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

module.exports = { findChatsByUserId };
