const mongoose = require("mongoose");
const { findChatsByUserId } = require("./chat.repository");
const { UserNotFoundError } = require("../../shared/errors");
const User = require("../../shared/models/user.model");
const Message = require("../messages/message.model");

async function getChatThreads(userId) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new UserNotFoundError("Invalid user id");
    }
    const user = await User.findById(userId);

    if (!user) {
        throw new UserNotFoundError("User does not exist");
    }

    return await findChatsByUserId(userId);
}

module.exports = { getChatThreads };
