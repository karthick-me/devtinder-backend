const mongoose = require("mongoose");
const { UserNotFoundError } = require("../../shared/errors");
const User = require("../../shared/models/user.model");

async function validateConnectionRequest(initiatorId, receiverId) {
    if (
        !mongoose.isValidObjectId(initiatorId) ||
        !mongoose.isValidObjectId(receiverId)
    ) {
        throw new UserNotFoundError("Invalid user ID(s)");
    }
    const [initiator, receiver] = await Promise.all([
        User.findById(initiatorId),
        User.findById(receiverId),
    ]);

    if (!initiator) {
        throw new UserNotFoundError("Initiator user not found");
    }
    if (!receiver) {
        throw new UserNotFoundError("Receiver user not found");
    }
}

module.exports = { validateConnectionRequest };
