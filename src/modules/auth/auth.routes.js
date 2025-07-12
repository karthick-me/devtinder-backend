const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const {
    signupController,
    loginController,
    logoutController,
} = require("./auth.controller");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", authenticateUser, logoutController);

module.exports = router;
