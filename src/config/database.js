const mongoose = require("mongoose");
const {
    DatabaseConnectionError,
} = require("../shared/errors/DatabaseConnectionError");

const connectDB = async function () {
    try {
        await mongoose.connect(
            "mongodb+srv://learningnodejs:pass@learningnodejs.5osorm2.mongodb.net/devTinder"
        );
    } catch (error) {
        throw new DatabaseConnectionError("Could not connect to MongoDB");
    }
};

module.exports = { connectDB };
