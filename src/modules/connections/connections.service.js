const Connection = require("./connections.model");
const { validateConnectionRequest } = require("./connections.validator");
const {
    ConnectionAlreadyExistsError,
    ConnectionNotExistsError,
    InvalidConnectionStatusError,
    ConnectionAlreadyMatchedError,
} = require("../../shared/errors");

const ConnectionStatus = {
    LIKED: "liked",
    MATCHED: "matched",
    REJECTED: "rejected",
    BLOCKED: "blocked",
};

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
            "connection request already exists between these users"
        );
    }

    const newConnection = new Connection({
        initiator: initiatorId,
        receiver: receiverId,
        status: ConnectionStatus.LIKED,
    });

    const savedConnection = await newConnection.save();

    return savedConnection;
}

async function acceptConnectionRequest(receiverId, initiatorId) {
    await validateConnectionRequest(receiverId, initiatorId);

    const existingConnection = await Connection.findOne({
        $or: [
            { initiator: initiatorId, receiver: receiverId },
            { initiator: receiverId, receiver: initiatorId },
        ],
    });

    if (!existingConnection) {
        throw new ConnectionNotExistsError(
            "Connection does not exist to accept"
        );
    }

    if (existingConnection.status === ConnectionStatus.MATCHED) {
        throw new ConnectionAlreadyMatchedError("Users already matched");
    }

    if (existingConnection.status !== ConnectionStatus.LIKED) {
        throw new InvalidConnectionStatusError("Connection cannot be accepted");
    }

    existingConnection.status = ConnectionStatus.MATCHED;

    existingConnection.lastInteractionAt = new Date();
    existingConnection.matchedAt = new Date();

    const updatedConnection = await existingConnection.save();

    return updatedConnection;
}

module.exports = { sendConnectionRequest, acceptConnectionRequest };
