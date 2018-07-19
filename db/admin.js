const Sequelize = require('sequelize');
const connection = require('./sql');
var model = require('./sql-model');

var Admin = model.define('content', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    presence: {
        type: Sequelize.STRING
    }

}, {timestamps: false});

module.exports = Admin;
