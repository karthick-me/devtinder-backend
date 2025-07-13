const Connection = require("./connections.model");

const findConnectionBetweenUsers = async function (initiatorId, receiverId) {
    return await Connection.findOne({
        $or: [
            { initiator: initiatorId, receiver: receiverId },
            { initiator: receiverId, receiver: initiatorId },
        ],
    });
};

const findUserConnections = async function (
    userId,
    status = "matched",
    {
        direction = "both",
        page = 1,
        limit = 10,
        sortBy = "lastInteractionAt",
        sortOrder = "desc",
    } = {}
) {
    const skip = (page - 1) * limit;

    let query = { status };

    if (direction === "incoming") {
        query.receiver = userId;
    } else if (direction === "outgoing") {
        query.initiator = userId;
    } else {
        query.$or = [{ initiator: userId }, { receiver: userId }];
    }
    return await Connection.find(query)
        .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .populate("initiator receiver", "name photoUrl");
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

const deleteConnection = async function (connection) {
    await connection.deleteOne();
    return connection;
};

module.exports = {
    findConnectionBetweenUsers,
    saveNewConnection,
    updateConnectionStatus,
    deleteConnection,
    findUserConnections,
};
