const axios = require("axios");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getMicrosoftAuthUrl = (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.MS_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.MS_REDIRECT_URI,
    response_mode: "query",
    scope: "User.Read",
    state: "ms", // optional
  });

  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
  res.json({ url: authUrl });
};

const handleMicrosoftCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: "Code is missing" });

    // Exchange code for token
    const tokenResponse = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      new URLSearchParams({
        client_id: process.env.MS_CLIENT_ID,
        client_secret: process.env.MS_CLIENT_SECRET,
        code,
        redirect_uri: process.env.MS_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user info
    const userResponse = await axios.get(
      'https://graph.microsoft.com/v1.0/me',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const { mail, userPrincipalName, displayName } = userResponse.data;
    const email = mail || userPrincipalName;

    // Find or create user
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name: displayName,
        email,
        imageUrl: null,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    res.json({
      token,
      user: { name: user.name, email: user.email, image: user.imageUrl }
    });
  } catch (err) {
    console.error("Microsoft OAuth Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMicrosoftAuthUrl,
  handleMicrosoftCallback,
};