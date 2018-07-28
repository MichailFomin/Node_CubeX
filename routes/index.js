var express=require('express');
var router=express.Router();
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var User=require('../db/user');
var db = require('../db/db');
var Sold_good=require('../db/sold_good');
var userName=false;
var userRole=false;

//homepage
router.get('/',function (req,res) {
    var content = db.contents.findAll().then(content=> {
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

//sold_goods
router.get('/sold_goods', (req, res) => {  
    db.users.findAll({
      include: [
        {
          model: db.sold_goods,//подключаем модель sold_goods, проданные товары
        }
      ] 
     
    }).then(users => {
        //берем с таблицы users данные
      const resObj = users.map(user => {

        return Object.assign(
          {},
          {
            user_id: user.id,
            name: user.name,
            sold_goods: user.sold_goods.map(sold_good => { //через связь с таблицей sold_goods достаем данные о проданных товарах
              return Object.assign(
                {},
               {
                  user_id: sold_good.user_id,
                  content_id: sold_good.content_id,
                  content_name: sold_good.content_name,
                  content_price: sold_good.content_price,
               }
               )
            })
          }
        )
      });
      
      res.json(resObj);

    });
  });


//cart
router.get('/cart',function (req,res) {
    var cart = db.contents.findOne({ where:{'id' : req.session.content_id}}).then(content=> {
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

//Buy content in cart
router.post('/cart/buy',function (req,res) {

    var user_id =  req.session.user_id;
    db.sold_goods.create({'content_id' : req.body.content_id,'content_name':req.body.content_name,'content_price':req.body.content_price, 'user_id':user_id}).then((sold_goods) => {
           
        });
   
     delete req.session['content_id']; 
    res.redirect('/');
    console.log(req.session);

});




module.exports = router;

