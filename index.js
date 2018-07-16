const connection = require('./db/sql');
//подключение db
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

var express=require('express');//подключаем express
var bodyParser = require('body-parser');//подключаем body-parser

var app=express();
app.set('view engine', 'ejs');//какой шаблонизатор используем

app.use('/public', express.static('public'));//подключаем статические переменные, находятся в папке public, ссылка /public
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){ //маршрутизация на главную страницу
    res.render('index');
    //res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res){ //маршрутизация на login
    res.render('login');
});

app.post('/login', urlencodedParser, function(req, res){ //маршрутизация на login
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);//(req.query) - данные с адресной строки
    res.render('index');
});

app.get('/registration', function(req, res){ //маршрутизация на registration
    res.render('registration');
});

app.get('/content/:id', function(req, res){ //просмотр страницы одного товара,поиск по id
    var obj={title:"Товар", name:'1C', descriptions:['Програмное обезпечение', 'ver 5.6.8', 'price:light 500, full 2000', 6]};
    res.render('content',{contentId:req.params.id, newParam:555, obj:obj});//сразу подключается к папке views и указываем только имя файла, передаем параметр id
});

//выполняем миграции
var config = {
    type: "mysql",
    host: "127.0.0.1",
    port: "3306",
    name: "node_cubex",
    user: "user",
    password: "password",
    migrations_dir: "./migrations"
}



app.listen(3000);//порт, который слушаем