const express = require("express");
const cookieparser = require("cookie-parser");

//routers
const authRouter = require("./modules/auth/auth.routes");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);
module.exports = app;
