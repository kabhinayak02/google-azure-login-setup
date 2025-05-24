const express = require("express");
const { googleAuthRedirect, googleAuthCallback } = require('../controllers/googleController');
const {
  getMicrosoftAuthUrl,
  handleMicrosoftCallback,
} = require("../controllers/microsoftController");

const router = express.Router();

// Microsoft Routes 
router.get("/microsoft/url", getMicrosoftAuthUrl);
router.get("/microsoft/callback", handleMicrosoftCallback);

// Google Routes 
router.get('/google/url', googleAuthRedirect);
router.get('/google/callback', googleAuthCallback);


module.exports = router;