const express = require("express");
const cookieparser = require("cookie-parser");

//routers
const authRouter = require("./modules/auth/auth.routes");
const userRouter = require("./modules/user/user.routes");
const connectionsRouter = require("./modules/connections/connections.routes");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/connections", connectionsRouter);
module.exports = app;
