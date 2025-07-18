const { sendToUser } = require("../ws.connection.manager");

function handleMessage(senderId, rawData) {
    let payload;

    try {
        payload = JSON.parse(rawData);
    } catch (err) {
        console.error("Invalid JSON from client:", rawData);
        return;
    }
    const { message } = payload;
    console.log(`message : ${message}`);

    const { type, recipientId, content } = payload;

    if (type === "message" && recipientId && content) {
        // Save to DB here (message model logic)
        sendToUser(recipientId, {
            type: "message",
            from: senderId,
            content,
            timestamp: Date.now(),
        });
    }
    return message;
}

module.exports = { handleMessage };
