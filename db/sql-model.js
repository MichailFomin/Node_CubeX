const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_cubex','user','password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// db.users = require('../models/users.js')(sequelize, Sequelize);
// db.contents = require('../models/contents.js')(sequelize, Sequelize);
// db.sold_goods = require('../models/sold_goods.js')(sequelize, Sequelize);

module.exports = sequelize;