const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        isGroup: {
            type: Boolean,
            default: false,
        },

        groupName: {
            type: String,
            default: null,
        },
        groupAdmins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        unreadCount: {
            type: Map,
            of: Number,
            default: {},
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        archivedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
