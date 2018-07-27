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
    //let user = db.users.findOne({ where:{'email' : req.body.email}}).then(user=>{
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
          model: db.sold_goods,
          include: [
            {
              model: db.contents
            }
          ]
        }
      ] 
     
    }).then(users => {
        
      const resObj = users.map(user => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            user_id: user.id,
            name: user.name,
            //content_id: sold_good.content_id,
            sold_goods: user.sold_goods.map(sold_good => {

              //tidy up the post data
              return Object.assign(
                {},
               {
                  user_id: sold_good.user_id,
                  content_id: sold_good.content_id,
                  



                                      // contents: sold_good.contents.map(content => {

                                      //   //tidy up the comment data
                                      //   return Object.assign(
                                      //     {},
                                      //     {
                                      //       content_id: content.id,
                                      //       name: content.name,
                                      //       description: content.description,
                                      //       img: content.img,
                                      //       //content: comment.content
                                      //     }
                                      //    )
                                      //  })



               }
               )
            })
          }
        )
      });
      
      //console.log(sold_goods);
      res.json(resObj);

    });
  });

// router.get('/sold_goods', function(req, res){ //просмотр страницы одного товара,поиск по id
//     var content = Sold_good.findAll().then(content=> {
//         req.session.user ? res.render('sold_goods',{userName:req.session.user,userRole:req.session.role,content: content}) :
//             res.render('sold_goods', {
//                 content: content,
//                 userName,userRole

//             });
//     });
// });

//cart
router.get('/cart',function (req,res) {
    var cart = db.contents.findOne({ where:{'id' : req.session.content_id}}).then(content=> {
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
    db.sold_goods.create({'content_id' : req.body.content_id, 'user_id':user_id}).then((sold_goods) => {
           
        });
   
     delete req.session['content_id']; 
    res.redirect('/');
    console.log(req.session);

});




module.exports = router;

