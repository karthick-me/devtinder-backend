const { validateConnectionRequest } = require("./connections.validator");
const {
    ConnectionAlreadyExistsError,
    ConnectionNotExistsError,
    InvalidConnectionStatusError,
    ConnectionAlreadyMatchedError,
    ConnectionAlreadyRejectedError,
    ConnectionRemovalNotAllowedError,
} = require("../../shared/errors");

const {
    findConnectionBetweenUsers,
    saveNewConnection,
    updateConnectionStatus,
    deleteConnection,
    findUserConnections,
} = require("./connections.repository");

const ConnectionStatus = {
    LIKED: "liked",
    MATCHED: "matched",
    REJECTED: "rejected",
    BLOCKED: "blocked",
};

async function sendConnectionRequest(initiatorId, receiverId) {
    await validateConnectionRequest(initiatorId, receiverId);

    const existingConnection = await findConnectionBetweenUsers(
        initiatorId,
        receiverId
    );

    if (existingConnection) {
        throw new ConnectionAlreadyExistsError(
            "connection request already exists between these users"
        );
    }

    const savedConnection = await saveNewConnection(initiatorId, receiverId);

    return savedConnection;
}

async function acceptConnectionRequest(receiverId, initiatorId) {
    await validateConnectionRequest(receiverId, initiatorId);

    const existingConnection = await findConnectionBetweenUsers(
        initiatorId,
        receiverId
    );

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

    const updatedConnection = await updateConnectionStatus(
        existingConnection,
        ConnectionStatus.MATCHED
    );

    return updatedConnection;
}

async function rejectConnectionRequest(receiverId, initiatorId) {
    await validateConnectionRequest(receiverId, initiatorId);

    const existingConnection = await findConnectionBetweenUsers(
        initiatorId,
        receiverId
    );

    if (!existingConnection) {
        throw new ConnectionNotExistsError(
            "Connection does not exist to reject"
        );
    }

    if (existingConnection.status === ConnectionStatus.REJECTED) {
        throw new ConnectionAlreadyRejectedError("Connection already rejected");
    }

    if (existingConnection.status === ConnectionStatus.MATCHED) {
        throw new ConnectionAlreadyMatchedError(
            "Can't reject matched connection"
        );
    }

    if (existingConnection.status !== ConnectionStatus.LIKED) {
        throw new InvalidConnectionStatusError(
            `Connection in '${existingConnection.status}' state cannot be rejected`
        );
    }

    const updatedConnection = await updateConnectionStatus(
        existingConnection,
        ConnectionStatus.REJECTED
    );

    return updatedConnection;
}

async function removeConnection(userId, targetUserId) {
    await validateConnectionRequest(userId, targetUserId);

    const existingConnection = await findConnectionBetweenUsers(
        userId,
        targetUserId
    );

    if (!existingConnection) {
        throw new ConnectionNotExistsError(
            "Connection does not exist to remove"
        );
    }

    if (existingConnection.status !== ConnectionStatus.MATCHED) {
        throw new ConnectionRemovalNotAllowedError(
            "Only matched connections can be removed"
        );
    }

    return await deleteConnection(existingConnection);
}

async function getAllMatchedConnections(userId, paginationOptions) {
    return await findUserConnections(
        userId,
        ConnectionStatus.MATCHED,
        paginationOptions
    );
}

async function getAllConnectionsRequest(userId, paginationOptions) {
    return await findUserConnections(
        userId,
        ConnectionStatus.LIKED,
        paginationOptions
    );
}

module.exports = {
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    removeConnection,
    getAllMatchedConnections,
    getAllConnectionsRequest,
};
