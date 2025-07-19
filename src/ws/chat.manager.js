const {
    registerUserSocket,
    getSocketByUserId,
    removeSocketByUserId,
} = require("./ws.manager");

const chatHandler = function (ws, request, data) {
    const { type, chatType, content } = JSON.parse(data);
    const sender = request.userId;
    const receiver = request.receiverId;

    if (chatType?.toLowerCase() === "private") {
        const receiverSocket = getSocketByUserId(receiver);
        if (receiverSocket) {
            console.log("user friend online");
            receiverSocket.send(
                JSON.stringify({ type: "chat", chatType: "private", content })
            );
        }
    }
};

module.exports = chatHandler;
