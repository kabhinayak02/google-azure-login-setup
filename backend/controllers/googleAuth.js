// const { oauth2Client } = require("../utils/googleClient");
// const axios = require('axios');
// const UserModel = require('../models/userModel');
// const jwt = require('jsonwebtoken');

/*
    This is also working fine, here I just use the library(oauth2Client), which help me to googleRes
*/
// const googleAuth = async (req, res) => {
//     try {
//         const { code } = req.query;
//         console.log("code======", code);
//         console.log("oauth2client======", oauth2Client);
//         const googleRes = await oauth2Client.getToken(code); // Exchange code for tokens (access and refresh tokens)
//         console.log("googleRes======", googleRes);
//         oauth2Client.setCredentials(googleRes.tokens);

//         const userRes = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//         );
//         const { email, name, picture } = userRes.data;

//         console.log("userRes.data++++", userRes.data);

//         let user = await UserModel.findOne({ email });

//         if (!user) {
//             user = await UserModel.create({
//                 name, email, imageUrl: picture
//             })
//         }

//         const { _id } = user;
//         const token = jwt.sign({ _id, email },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: process.env.JWT_TIMEOUT
//             }
//         );

//         return res.status(200).json({
//             message: 'Success',
//             token,
//             user
//         })
//     } catch (error) {
//         console.log("google Login error", error);
//         return res.status(500).json({
//             message: 'Internal server error',

//         })
//     }
// }

// module.exports = {
//     googleAuth
// }

/*
    This is without using the lib(oauth2Client) 
*/

const axios = require("axios");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const googleAuth = async (req, res) => {
  try {
    const { code } = req.query;

    // 1. Exchange code for access token
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage", // since it's auth-code + SDK
        grant_type: "authorization_code",
      }
    );
    console.log("tokenRes: +++++", tokenRes);
    const { access_token } = tokenRes.data;
    console.log("tokenRes.data+++++", tokenRes.data);

    // 2. Get user info
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const { name, email, picture } = userRes.data;

    // 3. Create or find user
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email, imageUrl: picture });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.json({ token, user: { name: user.name, email: user.email, image: user.imageUrl } });
  } catch (err) {
    console.error("Google OAuth Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { googleAuth };