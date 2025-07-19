const userSocketMap = new Map();

function registerUserSocket(userId, ws) {
    userSocketMap.set(userId, ws);
}

function getSocketByUserId(userId) {
    return userSocketMap.get(userId);
}

function removeSocketByUserId(userId) {
    userSocketMap.delete(userId);
}

module.exports = {
    registerUserSocket,
    getSocketByUserId,
    removeSocketByUserId,
};
