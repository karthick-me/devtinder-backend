const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const {
    sendConnectionRequestController,
    acceptConnectionRequestController,
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

module.exports = router;
