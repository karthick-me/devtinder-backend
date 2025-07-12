const validator = require("validator");
const { ValidationError } = require("../../shared/errors");

const validGenders = new Set(["male", "female", "other"]);

function validateFirstName(firstName, required = true) {
    if (
        required &&
        (!firstName || typeof firstName !== "string" || !firstName.trim())
    ) {
        throw new ValidationError("First name is required", "firstName");
    }
    if (
        !required &&
        firstName &&
        (typeof firstName !== "string" || !firstName.trim())
    ) {
        throw new ValidationError(
            "First name must be a valid string",
            "firstName"
        );
    }
}

function validateLastName(lastName, required = true) {
    if (
        required &&
        (!lastName || typeof lastName !== "string" || !lastName.trim())
    ) {
        throw new ValidationError("Last name is required", "lastName");
    }
    if (
        !required &&
        lastName &&
        (typeof lastName !== "string" || !lastName.trim())
    ) {
        throw new ValidationError(
            "Last name must be a valid string",
            "lastName"
        );
    }
}

function validateEmail(emailId) {
    if (
        !emailId ||
        typeof emailId !== "string" ||
        !validator.isEmail(emailId.trim())
    ) {
        throw new ValidationError("Valid email is required", "emailId");
    }
}

function validatePassword(password) {
    if (
        !password ||
        typeof password !== "string" ||
        !validator.isStrongPassword(password.trim())
    ) {
        throw new ValidationError("Password must be strong", "password");
    }
}

function validateAge(age, required = true) {
    if (required && (typeof age !== "number" || age < 13 || age > 120)) {
        throw new ValidationError("Age must be between 13 and 120", "age");
    }
    if (
        !required &&
        age &&
        (typeof age !== "number" || age < 13 || age > 120)
    ) {
        throw new ValidationError("Age must be between 13 and 120", "age");
    }
}

function validateGender(gender, required = true) {
    if (required && (!gender || !validGenders.has(gender.toLowerCase()))) {
        throw new ValidationError(
            "Gender must be male, female, or other",
            "gender"
        );
    }
    if (!required && gender && !validGenders.has(gender.toLowerCase())) {
        throw new ValidationError(
            "Gender must be male, female, or other",
            "gender"
        );
    }
}

function validateRegisterUser(user) {
    if (!user || typeof user !== "object" || Array.isArray(user)) {
        throw new ValidationError("User object is required", "body");
    }

    const { firstName, lastName, emailId, password, age, gender } = user;

    validateFirstName(firstName);
    validateLastName(lastName);
    validateEmail(emailId);
    validatePassword(password);
    validateAge(age);
    validateGender(gender);
}

function validateUpdateProfile(user) {
    if (!user || typeof user !== "object" || Array.isArray(user)) {
        throw new ValidationError("User object is required", "body");
    }

    // Allowed fields to edit
    const allowedFields = new Set([
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
    ]);
    const userFields = Object.keys(user);

    // If any unknown field is present
    for (const field of userFields) {
        if (!allowedFields.has(field)) {
            throw new ValidationError(
                `Field '${field}' is not allowed to update`,
                field
            );
        }
    }

    const { firstName, lastName, age, gender, about } = user;

    // Validate each field (if provided)
    validateFirstName(firstName, false);
    validateLastName(lastName, false);
    validateAge(age, false);
    validateGender(gender, false);

    if (about && typeof about !== "string") {
        throw new ValidationError("About must be a string", "about");
    }
}

module.exports = {
    validateRegisterUser,
    validateUpdateProfile,
};
