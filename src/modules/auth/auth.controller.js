const { registerUser, loginUser } = require("./auth.service");
const { formatSuccessResponse } = require("../../shared/utils");
const asyncHandler = require("../../shared/utils/asyncHandler");

const signupController = asyncHandler(async function (request, response) {
    const savedUser = await registerUser(request.body);
    const userId = savedUser._id;
    const successResponse = formatSuccessResponse({
        message: "User registered successfully",
        data: { userId },
        statusCode: 201,
    });
    return response.status(201).json(successResponse);
});

const loginController = asyncHandler(async function (request, response) {
    const emailId = request.body.emailId;
    const password = request.body.password;

    const { user, token } = await loginUser(emailId, password);
    const successResponse = formatSuccessResponse({
        message: "Login successfully",
        data: {
            user,
        },
        statusCode: 200,
    });
    response.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });
    return response.status(200).json(successResponse);
});

const logoutController = function (request, response) {
    const successResponse = formatSuccessResponse({
        message: "Logout successfully",
        statusCode: 200,
    });
    return response
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        })
        .status(200)
        .json(successResponse);
};

module.exports = { signupController, loginController, logoutController };
