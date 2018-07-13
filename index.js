var express=require('express');//подключаем express
var app=express();
app.set('view engine', 'ejs');//какой шаблонизатор используем

app.use('/public', express.static('public'));//подключаем статические переменные, находятся в папке public, ссылка /public

app.get('/', function(req, res){ //маршрутизация на главную страницу
    res.render('index');
    //res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res){ //маршрутизация на login
    res.render('login');
});

app.get('/registration', function(req, res){ //маршрутизация на registration
    res.render('registration');
});

app.get('/content/:id', function(req, res){ //просмотр страницы одного товара,поиск по id
    var obj={title:"Товар", name:'1C', descriptions:['Програмное обезпечение', 'ver 5.6.8', 'price:light 500, full 2000', 6]};
    res.render('content',{contentId:req.params.id, newParam:555, obj:obj});//сразу подключается к папке views и указываем только имя файла, передаем параметр id
});
app.listen(3000);//порт, который слушаем