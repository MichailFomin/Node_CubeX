const Sequelize = require('sequelize');
const connection = require('./sql');
var model = require('./sql-model');

var bcrypt=require('bcryptjs');

var User = model.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    }

}, {timestamps: false});

module.exports = User;


