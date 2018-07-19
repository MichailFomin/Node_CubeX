var express=require('express');
var router=express.Router();
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var User=require('../db/user');
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


//content
router.get('/content/:id', function(req, res){ //просмотр страницы одного товара,поиск по id
    var obj={title:"Товар", name:'1C', descriptions:['Програмное обезпечение', 'ver 5.6.8', 'price:light 500, full 2000', 6]};
    res.render('content',{contentId:req.params.id, newParam:555, obj:obj});//сразу подключается к папке views и указываем только имя файла, передаем параметр id
});


module.exports = router;

