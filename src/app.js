const express = require("express");
const cookieparser = require("cookie-parser");

//routers
const authRouter = require("./modules/auth/auth.routes");
const userRouter = require("./modules/user/user.routes");
const connectionsRouter = require("./modules/connections/connections.routes");
const chatRouter = require("./modules/chat/chat.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieparser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/connections", connectionsRouter);
app.use("/api/chat", chatRouter);

// Error middlewares
app.use(errorMiddleware);
module.exports = app;
