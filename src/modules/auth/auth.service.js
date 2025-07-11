const bcrypt = require("bcrypt");

const User = require("../user/user.model");
const { validateRegisterUser } = require("./auth.validator");
const DuplicationFieldError = require("../../shared/errors/DuplicationFieldError");

const SALT = 10;

async function registerUser(user) {
    //validating the user
    validateRegisterUser(user);

    //encrypting the password
    user.password = await bcrypt.hash(user.password, SALT);

    //creating new user
    const newUser = new User(user);

    try {
        //saving into the database
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicationFieldError("Duplicate email", "emailId");
        }
        throw error;
    }
}

module.exports = { registerUser };
