const express = require("express");
const {
    getAllThreadController,
    getMessagesController,
    sendMessageController,
    markAsReadController,
} = require("./chat.controller");
const { authenticateUser } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/threads", authenticateUser, getAllThreadController);
router.get("/:chatId/messages", authenticateUser, getMessagesController);
router.post("/:chatId/message", authenticateUser, sendMessageController);
router.patch("/:chaId/read", authenticateUser, markAsReadController);

module.exports = router;
