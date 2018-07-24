const Sequelize = require('sequelize');
//var model = require('./db');

module.exports = (sequelize, DataTypes) => {  
  const Admin = sequelize.define('contents', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    description: {
      type: DataTypes.STRING,
      required: true
    },
    img: {
      type: DataTypes.STRING,
      required: true
    },
    price: {
      type: DataTypes.FLOAT,
      required: true
    },
    presence: {
      type: DataTypes.STRING,
      required: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
    
  }, {underscored: true});
  return Admin;
};

// var Admin = model.define('contents', {
//     name: {
//         type: Sequelize.STRING
//     },
//     description: {
//         type: Sequelize.STRING
//     },
//     price: {
//         type: Sequelize.FLOAT
//     },
//     presence: {
//         type: Sequelize.STRING
//     },
//     img: {
//         type: Sequelize.STRING
//     }
// }, {timestamps: false});

// module.exports = Admin;
