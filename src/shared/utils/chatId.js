const crypto = require("crypto");

const generateOneToOneChatId = function (userId1, userId2) {
    const sorted = [userId1, userId2].sort().join(":");
    return crypto.createHash("sha256").update(sorted).digest("hex");
};

module.exports = { generateOneToOneChatId };
