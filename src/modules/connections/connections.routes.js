const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const {
    sendConnectionRequestController,
    acceptConnectionRequestController,
    rejectConnectionRequestController,
    removeConnecionController,
    getAllMatchedConnectionsController,
    getAllConnectionsRequestController,
} = require("./connections.controller");

const router = express.Router();

router.post(
    "/:receiverId/like",
    authenticateUser,
    sendConnectionRequestController
);

router.post(
    "/:initiatorId/accept",
    authenticateUser,
    acceptConnectionRequestController
);

router.post(
    "/:initiatorId/reject",
    authenticateUser,
    rejectConnectionRequestController
);

router.delete("/:targetUserId", authenticateUser, removeConnecionController);

router.get("/", authenticateUser, getAllMatchedConnectionsController);

router.get("/requests", authenticateUser, getAllConnectionsRequestController);

module.exports = router;
