const {
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    removeConnection,
    getAllMatchedConnections,
    getAllConnectionsRequest,
} = require("./connections.service");
const {
    formatSuccessResponse,
    formatErrorResponse,
} = require("../../shared/utils");
const asyncHandler = require("../../shared/utils/asyncHandler");

const sendConnectionRequestController = asyncHandler(async function (
    request,
    response
) {
    const initiatorId = request.userId;
    const receiverId = request.params.receiverId;

    const connection = await sendConnectionRequest(initiatorId, receiverId);

    const successResponse = formatSuccessResponse({
        message: "Connection request sent",
        data: { connection },
        statusCode: 201,
    });

    return response.status(201).json(successResponse);
});

const acceptConnectionRequestController = asyncHandler(async function (
    request,
    response
) {
    const receiverId = request.userId;
    const initiatorId = request.params.initiatorId;

    const updatedConnection = await acceptConnectionRequest(
        receiverId,
        initiatorId
    );
    const successResponse = formatSuccessResponse({
        message: "Connection request accepted",
        data: { updatedConnection },
        statusCode: 201,
    });

    return response.status(201).json(successResponse);
});

const rejectConnectionRequestController = asyncHandler(async function (
    request,
    response
) {
    const receiverId = request.userId;
    const initiatorId = request.params.initiatorId;

    const updatedConnection = await rejectConnectionRequest(
        receiverId,
        initiatorId
    );
    const successResponse = formatSuccessResponse({
        message: "Connection request rejected",
        data: { updatedConnection },
        statusCode: 200,
    });

    return response.status(200).json(successResponse);
});

const removeConnecionController = asyncHandler(async function (
    request,
    response
) {
    const userId = request.userId;
    const targetUserId = request.params.targetUserId;

    const removedConnection = await removeConnection(userId, targetUserId);

    const successResponse = formatSuccessResponse({
        message: "Connection removed",
        data: { removedConnection },
        statusCode: 200,
    });
    return response.status(200).json(successResponse);
});

const getAllMatchedConnectionsController = asyncHandler(async function (
    request,
    response
) {
    const userId = request.userId;

    const {
        page = 1,
        limit = 10,
        sortBy = "lastInteractionAt",
        sortOrder = "desc",
        direction = "both",
    } = request.query;

    const queryOptions = {
        page: Math.max(1, Number(page)),
        limit: Math.min(100, Number(limit)),
        sortBy,
        sortOrder,
        direction,
    };

    const connections = await getAllMatchedConnections(userId, queryOptions);

    const successResponse = formatSuccessResponse({
        message: "All matched users fetched successfully",
        data: { connections },
        statusCode: 200,
    });
    return response.status(200).json(successResponse);
});

const getAllConnectionsRequestController = asyncHandler(async function (
    request,
    response
) {
    const userId = request.userId;

    const {
        page = 1,
        limit = 10,
        sortBy = "lastInteractionAt",
        sortOrder = "desc",
        direction = "both",
    } = request.query;

    const queryOptions = {
        direction,
        page: Math.max(1, Number(page)),
        limit: Math.min(100, Number(limit)),
        sortBy,
        sortOrder,
    };

    const connections = await getAllConnectionsRequest(userId, queryOptions);

    const successResponse = formatSuccessResponse({
        message: "All connection request fetched successfully",
        data: { connections },
        statusCode: 200,
    });
    return response.status(200).json(successResponse);
});

module.exports = {
    sendConnectionRequestController,
    acceptConnectionRequestController,
    rejectConnectionRequestController,
    removeConnecionController,
    getAllMatchedConnectionsController,
    getAllConnectionsRequestController,
};
