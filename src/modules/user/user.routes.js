const express = require("express");

const { authenticateUser } = require("../../middlewares/auth.middleware");

const {
    getLoggedInUserController,
    updateUserProfileController,
} = require("../user/user.controller");

const router = express.Router();

router.get("/me", authenticateUser, getLoggedInUserController);
router.patch("/me", authenticateUser, updateUserProfileController);

module.exports = router;
