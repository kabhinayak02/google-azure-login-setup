const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    imageUrl: {
        type: String
    }
});

const User = mongoose.model('social-login', userSchema);

module.exports = User;