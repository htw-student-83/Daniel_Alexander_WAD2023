const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    firstname:{
        type: String
    },
    role:{
        type: String
    }
});

const UserModel = mongoose.model('user_roles', userSchema);

module.exports = UserModel;