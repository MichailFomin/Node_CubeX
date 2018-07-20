var express=require('express');
var router=express.Router();
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var User=require('../db/user');
var Sold_good=require('../db/sold_good');
var userName=false;
var userRole=false;

//homepage
router.get('/',function (req,res) {
    var content = Admin.findAll().then(content=> {
        req.session.user ? res.render('index',{userName:req.session.user,userRole:req.session.role,content: content}) :
        res.render('index', {
            content: content,
            userName,userRole

        });
    });

});

//add to cart
router.post('/',function (req,res) {
    var id =  req.body.content_id;
    req.session.content_id = id;
    res.redirect('/cart');
    console.log(req.session);

});

//content
router.get('/content', function(req, res){ //просмотр страницы одного товара,поиск по id
    var content = Sold_good.findAll().then(content=> {
        req.session.user ? res.render('content',{userName:req.session.user,userRole:req.session.role,content: content}) :
            res.render('content', {
                content: content,
                userName,userRole

            });
    });
});

//cart
router.get('/cart',function (req,res) {
    var cart = Admin.findOne({ where:{'id' : req.session.content_id}}).then(content=> {
        //console.log(content.dataValues);
        req.session.user ? res.render('cart',{userName:req.session.user,userRole:req.session.role,content: content}) :
            res.render('cart', {
                content: content,
                userName,userRole

            });
    });

});

//del from cart
router.post('/cart/delete',function (req,res) {
    delete req.session['content_id'];
    res.redirect('/');
    console.log(req.session);

});

//Buy content
router.post('/cart/buy',function (req,res) {

    var content_id =  req.body.content_id;
    var user_id =  req.session.user_id;

    let content = new Sold_good();
    content.content_id =  req.body.content_id;
    content.user_id = req.session.user_id;

    content.save();
    delete req.session['content_id'];
    res.redirect('/');
    console.log(req.session);

});




module.exports = router;

