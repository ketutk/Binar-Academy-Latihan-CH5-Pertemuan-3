require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const routeUser = require("./routes/users.routes");

app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1/users", routeUser);

module.exports = app;
