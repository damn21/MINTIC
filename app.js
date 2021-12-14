require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require('./src/routes/users');
app.use('/users', usersRouter);


module.exports = app;