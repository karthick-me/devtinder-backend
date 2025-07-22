const BadRequestError = require("../shared/errors/BadRequestError");
const { generateOneToOneChatId } = require("../shared/utils");
const WebSocket = require("ws");
const {
    registerUserSocket,
    getSocketByUserId,
    removeSocketByUserId,
} = require("./socket.registry");
const { sendMessage } = require("../modules/chat/chat.service");

const chatHandler = function (ws, request, data) {
    const { chatType } = data;

    if (chatType?.toLowerCase() === "one-to-one") {
        handleOneToOneChat(ws, request, data);
    }
};

const handleOneToOneChat = async function (ws, request, data) {
    const senderId = request.userId;
    const { receiverId, content } = data;

    if (!receiverId || !content) {
        throw new BadRequestError("receiverId and content are required");
    }

    const chatId = generateOneToOneChatId(senderId, receiverId);
    const receiver = getSocketByUserId(receiverId);

    if (receiver && receiver.readyState == WebSocket.OPEN) {
        console.log("📤 Sending to receiverId:", receiverId);
        const message = JSON.stringify({
            type: "chat",
            chatType: "one-to-one",
            receiverId,
            content,
        });
        receiver.send(message);
    }
    //receiver is not online so do api call not send through socket
    try {
        const savedMessage = await sendMessage(
            senderId,
            receiverId,
            chatId,
            content
        );
    } catch (error) {
        console.log("Error in sending message ws while storiing");
    }
};

module.exports = chatHandler;
