const Sequelize = require('sequelize');

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
