const socket = require("socket.io");

let io;

function setupSocket(server) {
    io = socket(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinChat", ({ userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            console.log("joining room : ", roomId);
            socket.join(roomId);
        });

        // Example backend Socket.IO
        socket.on("private_message", ({ from, to, senderName, message }) => {
            console.log("from " + from + " to " + to);
            const roomId = [from, to].sort().join("_");
            io.to(roomId).emit("messageReceived", {
                from,
                senderName,
                message,
            });
        });

        socket.on("disconnect", () => {
            console.log();
        });
    });
}

module.exports = { setupSocket };
