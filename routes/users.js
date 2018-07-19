var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var User=require('../db/user');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session

var userName=false;
var userRole=false;
var errorpas=false;
var errorlog=false;

//registration
router.get('/registration',function (req,res) {//маршрутизация на registration
    req.session.user ? res.render('registration',{userName:req.session.user,userRole:req.session.role}) :
    res.render('registration',{userName,userRole});
});

//login
router.get('/login',function (req,res) {//маршрутизация на login
    req.session.user ? res.render('login',{userName:req.session.user,userRole:req.session.role,errorpas,errorlog}) :
    res.render('login',{userName,userRole,errorpas,errorlog});
});

//registration user
router.post('/registration',function (req,res) { //маршрутизация на registration
    var name =  req.body.name;
    var email =  req.body.email;
    var password =  req.body.password;
    var password2 =  req.body.password2;

    //validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);
    var errors=req.validationErrors();
    if (errors){
        res.render('registration',{
            errors:errors,
            userName,
            userRole
        });
    }
    else{
        let user = new User();
        user.name =  req.body.name;
        user.email =  req.body.email;
        user.password =  req.body.password;
        user.role='user';
        var hash = bcrypt.hashSync(user.password, 10);
        user.password=hash;
        user.save();
        res.redirect('/login');
    }
});

//login user
router.post('/login', function(req, res) {

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors=req.validationErrors();
    if (errors){
        res.render('login',{
            errors:errors,
            userName,
            userRole,
            errorpas,
            errorlog
        });
    }
    else{
        let user = User.findOne({ where:{'email' : req.body.email}}).then(user=>{

            if (typeof user == 'object' && user){
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = user.name;
                    req.session.role = user.role;
                    req.session.save();
                    res.redirect('/');

                }else {
                    errorpas=true;
                    errorlog=false;
                        res.render('login',{
                        errorpas:errorpas,
                        userName,
                        userRole,
                        errorlog
                    });
                }

            }
            else {
                errorlog = true;
                res.render('login', {
                    errorlog: errorlog,
                    userName,
                    userRole,
                    errorpas
                });
            }
        });
    }
});

router.post('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');

});

module.exports = router;

