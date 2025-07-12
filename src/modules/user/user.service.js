const mongoose = require("mongoose");
const { UserNotFoundError } = require("../../shared/errors");
const User = require("../../shared/models/user.model");
const { validateUpdateProfile } = require("../../shared/validators/");

async function getUserById(userId) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new UserNotFoundError("User not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new UserNotFoundError("User not found");
    }

    return user;
}

async function updateUserProfileById(userId, user) {
    //checking is valid id
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new UserNotFoundError("User not found");
    }

    //validating user details to update profile
    validateUpdateProfile(user);

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
        throw new UserNotFoundError("User not found");
    }

    Object.keys(user).forEach((field) => {
        loggedInUser[field] = user[field];
    });

    const updatedUser = await loggedInUser.save();

    return updatedUser;
}

module.exports = {
    getUserById,
    updateUserProfileById,
};
