const Connection = require("./connections.model");

const findConnectionBetweenUsers = async function (initiatorId, receiverId) {
    return await Connection.findOne({
        $or: [
            { initiator: initiatorId, receiver: receiverId },
            { initiator: receiverId, receiver: initiatorId },
        ],
    });
};

const saveNewConnection = async function (
    initiatorId,
    receiverId,
    status = "liked"
) {
    const newConnection = new Connection({
        initiator: initiatorId,
        receiver: receiverId,
        status,
    });

    return await newConnection.save();
};

const updateConnectionStatus = async function (connection, newStatus) {
    connection.status = newStatus;
    connection.lastInteractionAt = new Date();

    if (newStatus === "matched") {
        connection.matchedAt = new Date();
    }
    return await connection.save();
};

module.exports = {
    findConnectionBetweenUsers,
    saveNewConnection,
    updateConnectionStatus,
};
