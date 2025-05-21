const axios = require("axios");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const microsoftAuth = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("ms_code########### ", code);
    
    // 1. Exchange code for token
    const tokenResponse = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      new URLSearchParams({
        client_id: process.env.MS_CLIENT_ID,
        client_secret: process.env.MS_CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:5173/oauth/microsoft",
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log("tokenResponse: ", tokenResponse);

    const accessToken = tokenResponse.data.access_token;
    console.log("accessToken: ", accessToken);

    // 2. Use token to get user info
    const userResponse = await axios.get(
      'https://graph.microsoft.com/v1.0/me',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log("userResponse: ", userResponse);

    const { mail, userPrincipalName, displayName } = userResponse.data;
    const email = mail || userPrincipalName;

    // 3. Create/find user
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name: displayName,
        email,
        imageUrl: null,
      });
    }
    console.log("user: ", user);

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    console.log("token: ", token);

    res.json({ token, user: { name: user.name, email: user.email, image: user.imageUrl } });
  } catch (error) {
    console.error("Microsoft OAuth Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { microsoftAuth };
