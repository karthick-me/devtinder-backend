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
connectionSchema.methods.toJSON = function () {
    const connection = this.toObject();

    delete connection._id;
    delete connection.createdAt;
    delete connection.updatedAt;
    delete connection.__v;
    return connection;
};
const Connection = new mongoose.model("Connection", connectionSchema);

module.exports = Connection;
