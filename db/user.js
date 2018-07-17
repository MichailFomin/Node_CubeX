const Sequelize = require('sequelize');
const connection = require('./sql');
var model = require('./sql-model');

var bcrypt=require('bcryptjs');

var User = model.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    }

}, {timestamps: false});

module.exports = User;

module.exports.getUserByEmail=function (email) {
    // var query={email:email};, 'password' : req.body.password
    // User.findOne(query, callback);
    console.log(req.body.email);
    User.findOne({ where:{'email' : req.body.email}});
}

module.exports.getUserById=function (id) {
    // var query={email:email};, 'password' : req.body.password
    // User.findOne(query, callback);
    User.findById(id);
}

module.exports.comparePassword=function (candidatePassword, hash){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
       if (err) throw err;
       return (null, isMatsh);
    });
}
