const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        initiator: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["liked", "matched", "rejected", "blocked"],
            required: true,
        },
        lastInteractionAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Connection = new mongoose.model("Connection", connectionSchema);

module.exports = Connection;
