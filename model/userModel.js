const mongoose = require('mongoose');

const userRolesSchema = new mongoose.Schema({
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

const UserRoleModel = mongoose.model('user_roles', userRolesSchema);

module.exports = UserRoleModel;