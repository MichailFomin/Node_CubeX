var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var User=require('../db/user');
//registration
router.get('/registration',function (req,res) {//маршрутизация на registration
    res.render('registration');
});

//login
router.get('/login',function (req,res) {//маршрутизация на login
    res.render('login');
});

//registration user
router.post('/registration',function (req,res) {//маршрутизация на registration
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
            errors:errors
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
        req.flash('success_msg', "You ar registered");
        res.redirect('/login');


    }
});


router.post('/login', function(req, res, next){ //маршрутизация на login
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res,next);
});


module.exports = router;

