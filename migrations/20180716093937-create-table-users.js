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
    db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        email: {type:'string',unique:true},
        password: 'string',
        tocen: 'string',
        role: 'string',
        created_at:'date',
        updated_at:'date'
    });

};

exports.down = function(db) {
    db.dropTable('users');
};

exports._meta = {
  "version": 1
};
