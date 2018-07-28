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
    db.createTable('sold_goods', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        content_id: 'int',
        user_id: 'int',
        content_name:'string',
        content_price:'float',
        created_at:'date',
        updated_at:'date'
    });
};

exports.down = function(db) {
    db.dropTable('sold_goods');
};

exports._meta = {
  "version": 1
};
