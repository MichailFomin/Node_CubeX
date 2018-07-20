const Sequelize = require('sequelize');
const connection = require('./sql');
var model = require('./sql-model');

var Sold_good = model.define('sold_goods', {
    content_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    }
}, {timestamps: false});

module.exports = Sold_good;
