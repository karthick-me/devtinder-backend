const { connectDB } = require("./config/database");
const app = require("./app");

const PORT = 3000;

(async () => {
    try {
        console.log("hi");
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        process.exit(1);
    }
})();
