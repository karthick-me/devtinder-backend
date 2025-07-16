const mongoose = require("mongoose");
const { findAllChatsByUserId, findChatByUserId } = require("./chat.repository");
const { validateUserById } = require("../../shared/validators");

async function getChatThreads(userId) {
    validateUserById(userId);
    return await findAllChatsByUserId(userId);
}

async function getMessages(chatId, userId) {
    validateUserById(userId);
    console.log("hi");
    return await findChatByUserId(chatId, userId);
}

module.exports = { getChatThreads, getMessages };
