const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const { sendConnectionRequestController } = require("./connections.controller");

const router = express.Router();

router.post(
    "/:receiverId/like",
    authenticateUser,
    sendConnectionRequestController
);

module.exports = router;
