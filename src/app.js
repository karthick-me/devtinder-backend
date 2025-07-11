const express = require("express");

const app = express();

//middlewares
app.use(express.json());

const authRouter = require("./modules/auth/auth.routes");

app.use("/api/auth", authRouter);
module.exports = app;
