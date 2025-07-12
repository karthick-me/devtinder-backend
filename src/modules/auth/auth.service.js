const User = require("../../shared/models/user.model");
const { validateRegisterUser } = require("./auth.validator");

const { DuplicationFieldError } = require("../../shared/errors");

const SALT = 10;

async function registerUser(user) {
    //validating the user
    validateRegisterUser(user);

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

async function loginUser(emailId, password) {
    //getting the user details
    const user = await User.findByCredentials(emailId, password);

    //getting the JWT token
    const token = await user.generateJWT();
    return { user, token };
}

module.exports = { registerUser, loginUser };
