const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {  
  const Sold_good = sequelize.define('sold_goods', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      required: true
    },
    content_id: {
      type: DataTypes.INTEGER,
      required: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE
    
  }, {underscored: true});
  return Sold_good;
};


// var Sold_good = model.define('sold_goods', {
//     content_id: {
//         type: Sequelize.INTEGER
//     },
//     user_id: {
//         type: Sequelize.INTEGER
//     }
// }, {timestamps: false});

// module.exports = Sold_good;
