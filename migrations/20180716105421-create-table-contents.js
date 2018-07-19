'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    db.createTable('contents', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        description: 'string',
        img: 'string',
        price: 'float',
        presence: 'string',
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE
    });

};

exports.down = function(db) {
    db.dropTable('contents');
};

exports._meta = {
  "version": 1
};
