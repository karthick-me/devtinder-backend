const http = require("http");
const app = require("./app");
const { connectDB } = require("./config/database");
const { initWebSocket } = require("./ws");
const PORT = 3000;

(async () => {
    try {
        await connectDB().then(() => {
            console.log("DB connected successfully");
            const mongoose = require("mongoose");
        });

        const server = http.createServer(app);

        initWebSocket(server);

        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        process.exit(1);
    }
})();
