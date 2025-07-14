const express = require("express");
const { getAllThreadController } = require("./chat.controller");
const { authenticateUser } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/threads", authenticateUser, getAllThreadController);

module.exports = router;
