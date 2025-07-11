const express = require("express");

const app = express();

app.use("/", (request, response) => {
    response.send("Hi from server");
});

module.exports = app;
