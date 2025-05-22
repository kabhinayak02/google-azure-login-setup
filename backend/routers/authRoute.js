const express = require("express");
const { googleAuth } = require('../controllers/googleAuth');
const {
  getMicrosoftAuthUrl,
  handleMicrosoftCallback,
} = require("../controllers/microsoftController");

const router = express.Router();

router.get("/microsoft/url", getMicrosoftAuthUrl);
router.get("/microsoft/callback", handleMicrosoftCallback);
router.get("/google", googleAuth);

module.exports = router;