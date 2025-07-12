const { registerUser, loginUser } = require("./auth.service");

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

const loginController = async function (request, response) {
    try {
        const emailId = request.body.emailId;
        const password = request.body.password;

        const { user, token } = await loginUser(emailId, password);
        response
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
            })
            .status(200)
            .json({
                success: true,
                message: "Login successfully",
                data: {
                    user,
                },
                statusCode: 200,
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

const logoutController = function (request, response) {
    response
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        })
        .status(200)
        .json({
            success: true,
            message: "Logout successfully",
            statusCode: 200,
            timestamp: new Date().toISOString(),
        });
};

module.exports = { signupController, loginController, logoutController };
