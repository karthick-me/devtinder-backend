const mongoose = require("mongoose");

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
            trim: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
