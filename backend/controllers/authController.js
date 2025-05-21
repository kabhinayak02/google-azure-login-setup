const { oauth2Client } = require("../utils/googleClient");
const axios = require('axios');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const googleAuth = async (req, res) => {
    try {
        const { code } = req.query;
        console.log("code======", code);
        console.log("oauth2client======", oauth2Client);
        const googleRes = await oauth2Client.getToken(code); // Exchange code for tokens (access and refresh tokens)
        console.log("googleRes======", googleRes);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;

        console.log("userRes.data++++", userRes.data);

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name, email, imageUrl: picture
            })
        }

        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_SECRET
            }
        );

        return res.status(200).json({
            message: 'Success',
            token,
            user
        })
    } catch (error) {
        console.log("google Login error", error);
        return res.status(500).json({
            message: 'Internal server error',

        })
    }
}

module.exports = {
    googleAuth
}