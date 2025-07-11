const { registerUser } = require("./auth.service");

const signupController = async function (request, response) {
    try {
        const savedUser = await registerUser(request.body);
        const userId = savedUser._id.toString();
        response.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { userId },
            statusCode: 201,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const errorType = error.type || "InternalServerError";
        const details = error.details || null;
        const message = error.message || "Something went wrong";
        response.status(statusCode).json({
            success: false,
            message,
            error: {
                type: errorType,
                details,
            },
            statusCode,
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = { signupController };
