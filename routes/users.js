var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var User=require('../db/user');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
// var passport = require('passport');
// var LocalStrategy=require('passport-local').Strategy;
var userName=false;
//registration
router.get('/registration',function (req,res) {//маршрутизация на registration
    req.session.user ? res.render('registration',{userName:req.session.user}) :
    res.render('registration',{userName});
});

//login
router.get('/login',function (req,res) {//маршрутизация на login

    req.session.user ? res.render('login',{userName:req.session.user}) :
    res.render('login',{userName});
    //console.log(req.session);
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
        var hash = bcrypt.hashSync(user.password, 10);
        user.password=hash;
        user.save();
        req.flash('success_msg', "You ar registered");
        res.redirect('/login');


    }
});

router.post('/login', function(req, res) {
    var email =  req.body.email;
    var password =  req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors=req.validationErrors();
    if (errors){
        res.render('login',{
            errors:errors
        });
    }
    else{
        let user = User.findOne({ where:{'email' : req.body.email}}).then(user=>{

            if (typeof user == 'object' && user){
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = user.id;
                    req.session.save();
                    res.redirect('/');
                    //console.log(session);

                }else {
                    var error=true;
                    res.render('login',{
                            error:error
                        });
                    console.log(error);
                }

            }
            else {res.json({
                message : 'not successful login'
            });}
        });
       //




    }
});

router.post('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');

});

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




module.exports = router;

