const { WebSocket, WebSocketServer } = require("ws");
const authenticateUpgrade = require("./utils/authenticateUpgrade");
const url = require("url");
const {
    registerUserSocket,
    getSocketByUserId,
    removeSocketByUserId,
} = require("./ws.manager");
const { parse } = require("path");
const chatHandler = require("./chat.manager");

function setupWebSocketServer(server) {
    const wss = new WebSocketServer({ noServer: true }, () => {
        console.log("Websocket server is created and verified user");
    });

    //manually handling HTTP to WS for authenticating user ok
    server.on("upgrade", (request, socket, head) => {
        const parsedUrl = new URL(
            request.url,
            `http://${request.headers.host}`
        );
        const pathname = parsedUrl.pathname;

        const receiverId = pathname.split("/")[2];

        const userId = authenticateUpgrade(request);

        if (!userId) {
            console.warn("WebSocket auth failed");
            socket.write(
                "HTTP/1.1 400 Unauthorized\r\nConnection: close\r\n\r\n"
            );
            socket.destroy();
            return;
        }

        if (pathname.startsWith("/chat/")) {
            request.userId = userId;
            request.receiverId = receiverId;
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit("connection", ws, request);
            });
        } else {
            console.log("invalid path for ws");
            socket.write("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n");
            socket.destroy();
        }
    });

    wss.on("connection", (ws, request) => {
        const userId = request.userId;
        registerUserSocket(userId, ws);

        ws.on("message", (data) => {
            const { type } = JSON.parse(data);
            if (type?.toLowerCase() === "chat".toLowerCase()) {
                chatHandler(ws, request, data);
            }
        });

        ws.on("close", () => {
            removeSocketByUserId(userId);
        });
    });
}

module.exports = { setupWebSocketServer };
