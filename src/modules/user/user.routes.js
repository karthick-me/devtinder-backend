const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const { getLoggedInUserController } = require("../user/user.controller");

const router = express.Router();

router.get("/me", authenticateUser, getLoggedInUserController);

module.exports = router;
