var express=require('express');
var router=express.Router();
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var User=require('../db/user');
var db = require('../db/db');
var Sold_good=require('../db/sold_good');

const dotenv = require('dotenv'); 
var stripe = require("stripe")("pk_test_w3CAIc7zrNuYK9Qud0NE7FMH");
var customer = stripe.customers.create(
  { email: 'vera.kopylchuk@gmail.com' },
  function(err, customer) {
    err; // null if no error occurred
    customer; // the created customer object
  }
);

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
    // console.log(req.session);

});

//delete content
router.post('/del',function (req,res) {
    var id =  req.body.content_id;
    db.contents.destroy({ where: { id: id } }).then((contents) => {});
    res.redirect('/');
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

      req.session.user ? res.render('sold_goods',{userName:req.session.user,userRole:req.session.role,resObj: resObj}) :
      res.render('sold_goods', {
            resObj: resObj,
            userName,userRole

        });
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
// router.post('/cart/buy',function (req,res) {

//     var user_id =  req.session.user_id;
//     db.sold_goods.create({'content_id' : req.body.content_id,'content_name':req.body.content_name,'content_price':req.body.content_price, 'user_id':user_id}).then((sold_goods) => {
           
//         });
   
//      delete req.session['content_id']; 
//     res.redirect('/');
//     console.log(req.session);

// });

router.post('/cart/charge',function (req,res) {
  var token=req.body.stripeToken;
  var chargeAmount=req.body.chargeAmount;
  var content_id= req.body.content_id;
  console.log(chargeAmount);
  var charge=stripe.charges.create({
    amount:chargeAmount,
    currency:"gbp",
    source:token
  }, function(err, charge){
    if(err & err.type==="StripeCardError"){
      console.log("Your card was decliend");
    }
  });
  var user_id =  req.session.user_id;
  
    db.sold_goods.create({'content_id' : content_id,'content_name':req.body.content_name,'content_price':req.body.content_price, 'user_id':user_id}).then((sold_goods) => {
           
        });
   
     delete req.session['content_id']; 
  console.log("Your paymet was successful");
  res.redirect('/');
});


module.exports = router;

