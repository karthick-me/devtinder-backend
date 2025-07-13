const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const {
    sendConnectionRequestController,
    acceptConnectionRequestController,
    rejectConnectionRequestController,
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

module.exports = router;
