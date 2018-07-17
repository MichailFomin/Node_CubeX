const Sequelize = require('sequelize');
var model = require('./sql-model');

const User = model.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }

}, {timestamps: false});

module.exports = User;