const { connectDB } = require("./config/database");
const app = require("./app");

const PORT = 3000;

(async () => {
    try {
        await connectDB().then(() => {
            console.log("DB connected successfully");
        });

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        process.exit(1);
    }
})();
