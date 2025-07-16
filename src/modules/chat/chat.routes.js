const express = require("express");
const {
    getAllThreadController,
    getMessagesController,
} = require("./chat.controller");
const { authenticateUser } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/threads", authenticateUser, getAllThreadController);
router.get("/:chatId/messages", authenticateUser, getMessagesController);

module.exports = router;
