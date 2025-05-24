const oauth2Client = require('../utils/googleClient');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.googleAuthRedirect = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5173/oauth/google" 
  });
  res.json({ url: authUrl });
};

exports.googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );
    const { email, name, picture } = userInfo.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email, imageUrl: picture });
    }

    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.json({
      token,
      user: { name: user.name, email: user.email, image: user.imageUrl }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).send('Authentication failed');
  }
};
