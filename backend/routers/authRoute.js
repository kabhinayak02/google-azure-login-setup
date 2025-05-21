const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../controllers/authController');
const { microsoftAuth } = require("../controllers/microsoftAuth");

Router.get("/google", googleAuth);
Router.get("/microsoft", microsoftAuth);

module.exports = Router;