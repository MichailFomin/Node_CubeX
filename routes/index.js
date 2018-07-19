var express=require('express');
var router=express.Router();
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var userName=false;
//homepage
router.get('/',function (req,res) {
    req.session.user ? res.render('index',{userName:req.session.user}) :
        res.render('index',{userName});

    console.log(req.session.user);
});


//content
router.get('/content/:id', function(req, res){ //просмотр страницы одного товара,поиск по id
    var obj={title:"Товар", name:'1C', descriptions:['Програмное обезпечение', 'ver 5.6.8', 'price:light 500, full 2000', 6]};
    res.render('content',{contentId:req.params.id, newParam:555, obj:obj});//сразу подключается к папке views и указываем только имя файла, передаем параметр id
});


module.exports = router;

