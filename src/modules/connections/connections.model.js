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

        matchedAt: {
            type: Date,
            default: null,
        },
        lastInteractionAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

connectionSchema.index({ initiator: 1, receiver: 1 }, { unique: true });

connectionSchema.methods.toJSON = function () {
    const { _id, __v, createdAt, updatedAt, ...connection } = this.toObject();
    return connection;
};
const Connection = new mongoose.model("Connection", connectionSchema);

module.exports = Connection;
