const mongoose = require("mongoose");
const { UserNotFoundError } = require("../../shared/errors");
const User = require("../../shared/models/user.model");

async function getUserById(userId) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new UserNotFoundError("User not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new UserNotFoundError("User not found");
    }

    return user;
}

module.exports = { getUserById };
