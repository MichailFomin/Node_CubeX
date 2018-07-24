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

 

module.exports = sequelize;