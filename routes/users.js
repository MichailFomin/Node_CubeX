var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var User=require('../db/user');
var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;

//registration
router.get('/registration',function (req,res) {//маршрутизация на registration
    res.render('registration');
});

//login
router.get('/login',function (req,res) {//маршрутизация на login
    res.render('login');
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
            errors:errors
        });
    }
    else{
        let user = new User();
        user.name =  req.body.name;
        user.email =  req.body.email;
        user.password =  req.body.password;
        user.role='user';
       // var hash = bcrypt.hashSync(user.password, 10);
        user.password=hash;
        user.save();
        req.flash('success_msg', "You ar registered");
        res.redirect('/login');


    }
});
//
// passport.use(new LocalStrategy(
//     function(email, password, done) {
//         User.getUserByEmail(email, function(err, user) {
//             console.log(email);
//             if (err) throw err;
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             User.comparePassword(password, user.password, function (err, isMatch) {
//                 if (err) throw err;
//                 if (isMatch){
//                     return done(null, user);
//                 } else{
//                     return done(null, false, {message:'Incorrect password.' })
//                 }
//             });
//         });
//     }));
//
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });
//
//
// router.post('/login',passport.authenticate('local', {successRedirect: '/',failureRedirect: '/login',failureFlash: true}),
//     function(req, res) {
//         res.redirect('/');
//         console.log(req);
//     });


// router.post('/login', function(req, res, next){ //маршрутизация на login
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res,next);
// });

router.post('/login', function(req, res, next) {
    var email =  req.body.email;
    var password =  req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors=req.validationErrors();
    if (errors){
        res.render('registration',{
            errors:errors
        });
    }
    else{
        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        //     // res == true
        // });

        var user = User.findOne({ where:{'email' : req.body.email, 'password' : req.body.password}});
        if (!user) return next(HttpError(403, 'wrong e-mail / password'));
        console.log(user.id);
        // req.session.user = user.id;
        // req.session.save();
        res.json({
            message : 'successful login'
        });
    }




});


module.exports = router;

