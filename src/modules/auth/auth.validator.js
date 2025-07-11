const validator = require("validator");
const ValidationError = require("../../shared/errors/ValidationError");

const validGenders = new Set(["male", "female", "other"]);

function validateRegisterUser(user) {
    if (!user || typeof user !== "object" || Array.isArray(user)) {
        throw new ValidationError(
            "Request body must be a valid user object",
            "body"
        );
    }

    const { firstName, lastName, emailId, password, age, gender } = user;

    if (typeof firstName !== "string" || !firstName.trim()) {
        throw new ValidationError(
            "First name is required and must be a non-empty string",
            "firstName"
        );
    }

    if (typeof lastName !== "string" || !lastName.trim()) {
        throw new ValidationError(
            "Last name is required and must be a non-empty string",
            "lastName"
        );
    }

    if (typeof emailId !== "string" || !validator.isEmail(emailId)) {
        throw new ValidationError(
            "Email must be a valid email address",
            "emailId"
        );
    }

    if (typeof password !== "string" || !validator.isStrongPassword(password)) {
        throw new ValidationError(
            "Password must include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
            "password"
        );
    }

    if (typeof age !== "number" || age < 13 || age > 120) {
        throw new ValidationError(
            "Age must be a number between 13 and 120",
            "age"
        );
    }

    if (typeof gender !== "string" || !validGenders.has(gender.toLowerCase())) {
        throw new ValidationError(
            "Gender must be one of: male, female, or other",
            "gender"
        );
    }
}

module.exports = { validateRegisterUser };
