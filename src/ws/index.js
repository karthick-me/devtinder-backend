const { WebSocketServer } = require("ws");

const { handleMessage } = require("./ws-events/message.handler");
const {
    registerConnection,
    removeConnection,
} = require("./ws.connection.manager");

let userCount = 0;
function initWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws, request) => {
        const userId = parseUserIdFromQuery(request.url);

        if (!userId) {
            ws.close();
            return;
        }

        registerConnection(userId, ws);

        ws.on("message", (data) => {
            const msg = handleMessage(userId, data);
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ message: msg }));
            });
        });

        ws.on("close", () => {
            removeConnection(userId);
        });

        console.log(
            `user connected with id : ${userId} and count ${++userCount}`
        );
    });
}

function parseUserIdFromQuery(url) {
    try {
        const query = new URLSearchParams(url.split("?")[1]);
        return query.get("userId");
    } catch {
        return null;
    }
}

module.exports = { initWebSocket };
