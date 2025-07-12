const mongoose = require("mongoose");
const { UserNotFoundError, InvalidPasswordError } = require("../errors/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT = 10;

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
        },
        age: {
            type: Number,
            min: 13,
            max: 120,
        },
        gender: {
            type: String,
            trim: true,
            enum: ["male", "female", "other"],
        },
        photoUrl: {
            type: String,
            trim: true,
            default: "https://example.com/default-photo.jpg",
        },
        about: {
            type: String,
            default: "hey i am using dev tinder",
        },
        skills: {
            type: [String],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, SALT);
    }
    next();
});

userSchema.methods.generateJWT = function () {
    const payload = {
        sub: this._id,
    };
    const token = jwt.sign(payload, "KARTHICK", { expiresIn: "30d" });
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    user.id = user._id;

    delete user.password;
    delete user.emailId;
    delete user._id;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
};

userSchema.statics.findByCredentials = async function (emailId, password) {
    const user = await this.findOne({ emailId });

    if (!user) {
        throw new UserNotFoundError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new InvalidPasswordError("Password is incorrect");
    }

    return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
