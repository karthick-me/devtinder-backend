const Connection = require("./connections.model");
const { validateConnectionRequest } = require("./connections.validator");
const { ConnectionAlreadyExistsError } = require("../../shared/errors");

async function sendConnectionRequest(initiatorId, receiverId) {
    await validateConnectionRequest(initiatorId, receiverId);

    const existingConnection = await Connection.findOne({
        $or: [
            { initiator: initiatorId, receiver: receiverId },
            { initiator: receiverId, receiver: initiatorId },
        ],
    });

    if (existingConnection) {
        throw new ConnectionAlreadyExistsError(
            "A connection request already exists between these users"
        );
    }

    const newConnection = new Connection({
        initiator: initiatorId,
        receiver: receiverId,
        status: "liked",
    });

    const savedConnection = await newConnection.save();

    return savedConnection;
}

module.exports = { sendConnectionRequest };
