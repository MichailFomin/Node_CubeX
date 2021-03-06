const Sequelize = require('sequelize');  
const dotenv = require('dotenv');  
const sequelize = new Sequelize(
	process.env.DATABASE_NAME, 
	process.env.DATABASE_USERNAME, 
	process.env.DATABASE_PASSWORD, 
	{  
  		host: process.env.DATABASE_HOST,
 		port: process.env.DATABASE_PORT,
  		dialect: process.env.DATABASE_DIALECT,
  		define: {
    		underscored: true
  		}
	});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//Models/tables
db.users = require('./user.js')(sequelize, Sequelize);
db.contents = require('./admin.js')(sequelize, Sequelize);
db.sold_goods = require('./sold_good.js')(sequelize, Sequelize);

//Relations
db.sold_goods.belongsTo(db.users);
db.sold_goods.belongsTo(db.contents);
db.users.hasMany(db.sold_goods);


module.exports = db;  