var express=require('express');
var router=express.Router();
var User=require('../db/user');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var userName=false;
var userRole=false;


//admin
router.get('/admin',function (req,res) {//маршрутизация на admin
    req.session.user ? res.render('admin',{userName:req.session.user,userRole:req.session.role}) :
        res.render('admin',{userName,userRole});
});

//add content
router.post('/admin',function (req,res) { //маршрутизация на registration.path
    console.log(req.body.img);
    var name =  req.body.name;
    var description =  req.body.description;
    var price =  req.body.price;
    var img =  req.body.img;
    //validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
   // req.checkBody('img', 'Is not images').matches(/(?:jp(?:e?g|e|2)|gif|png|tiff?|bmp|ico)/);
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('price', 'must contain a number').matches(/\d/);//вводить число 'png', 'jpeg','jpg'
    var errors=req.validationErrors();
    if (errors){
        res.render('admin',{
            errors:errors,
            userName,
            userRole
        });
    }
    else{
        let content = new Admin();
        content.name =  req.body.name;
        content.description =  req.body.description;
        content.price =  req.body.price;
        content.img =  req.body.img;
        content.presence='yes';
        content.save();
        console.log(req.body.name);
        //req.flash('success_msg', "You ar registered");
        res.redirect('/admin');
    }
});

module.exports = router;