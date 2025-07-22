const { WebSocket, WebSocketServer } = require("ws");
const authenticateUpgrade = require("./utils/authenticateUpgrade");
const url = require("url");
const {
    registerUserSocket,
    getSocketByUserId,
    removeSocketByUserId,
} = require("./socket.registry");
const chatHandler = require("./chat.handler");

function setupWebSocketServer(server) {
    const wss = new WebSocketServer({ noServer: true }, () => {
        console.log("Websocket server is created and verified user");
    });

    //manually handling upgrade from HTTP to WS for authenticating user
    server.on("upgrade", (request, socket, head) => {
        const parsedUrl = new URL(
            request.url,
            `http://${request.headers.host}`
        );
        const pathname = parsedUrl.pathname;

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
            try {
                const parsed = JSON.parse(data);

                const type = parsed?.type?.toLowerCase();

                if (type === "chat") {
                    chatHandler(ws, request, parsed);
                } else if (type === "ack") {
                    console.log("message sended");
                } else {
                    ws.send(
                        JSON.stringify({
                            type: "error",
                            message: "Unsupported message type",
                        })
                    );
                    ws.close();
                }
            } catch (error) {
                console.error("WebSocket message error:", error);

                ws.send(
                    JSON.stringify({
                        type: "error",
                        message: "Invalid message format or internal error",
                    })
                );
                ws.close();
            }
        });

        ws.on("close", () => {
            removeSocketByUserId(userId);
        });
    });
}

module.exports = { setupWebSocketServer };
