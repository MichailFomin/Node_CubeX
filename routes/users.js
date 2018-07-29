var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var User=require('../db/user');
var db = require('../db/db');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session

var userName=false;
var userRole=false;
var errorpas=false;
var errorlog=false;
var err='true';
//registration
router.get('/registration',function (req,res) {//маршрутизация на registration
    req.session.user ? res.render('registration',{userName:req.session.user,userRole:req.session.role,err}) :
    res.render('registration',{userName,userRole,err});
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
    req.checkBody('name', 'Name maximum length 15 characters').isLength({ max: 15 });
    req.checkBody('name', 'Name min length 2 characters').isLength({ min: 2 });
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password maximum length 15 characters').isLength({ max: 15 });
    req.checkBody('password', 'Password min length 3 characters').isLength({ min: 3 });
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

        var hash = bcrypt.hashSync(req.body.password, 10);

        db.users.create({'email' : req.body.email, 'name':req.body.name, 'role':'user', 'password':hash}).then((users) => {
            res.redirect('/login');
             
        }).catch(function(err) {
            if (err){
                err='a user with this email '+req.body.email+' already registered';
                res.render('registration',{
                    err:err,
                    userName,
                    userRole
                });
            }
            
        });
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
        let user = db.users.findOne({ where:{'email' : req.body.email}}).then(user=>{
            if (typeof user == 'object' && user){
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user_id = user.id;
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

