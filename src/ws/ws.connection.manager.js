const userSocketMap = new Map();

function registerConnection(userId, ws) {
    userSocketMap.set(userId, ws);
    console.log(`User ${userId} connected`);
}

function removeConnection(userId) {
    userSocketMap.delete(userId);
    console.log(`User ${userId} disconnected`);
}

function sendToUser(userId, message) {
    const ws = userSocketMap.get(userId);
    if (ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(message));
    }
}

module.exports = {
    registerConnection,
    removeConnection,
    sendToUser,
};
