const jwt = require("jsonwebtoken");
const User = require("../shared/models/user.model");
const { UserNotFoundError } = require("../shared/errors");

const authenticateUser = async function (request, response, next) {
    const { token } = request.cookies;

    if (!token) {
        return response.status(401).json({
            success: false,
            message: "Authentication required",
            statusCode: 401,
            timestamp: new Date().toISOString(),
        });
    }

    try {
        const decoded = jwt.verify(token, "KARTHICK");
        const { sub: userId } = decoded;
        const user = await User.findById({ _id: userId });
        if (!user) {
            throw new UserNotFoundError("User not found");
        }

        request.userId = userId;
        next();
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        const type = error.type || "InternalServerError";
        response.status(statusCode).json({
            success: false,
            message,
            error: {
                type,
            },
            statusCode,
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = { authenticateUser };
