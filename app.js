var connection = require('./db/sql');
var Sequelize = require('sequelize');
var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;
//const User = require('./db/user');
var express=require('express');//подключаем express
var bodyParser = require('body-parser');//подключаем body-parser
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
//var path=require('path');
var HttpError = require('http-errors');
var expressValidator = require('express-validator');
//var exphbs  = require('express-handlebars');
var fs=require('fs');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var userName=false;

//routes
var routes=require('./routes/index');
var users=require('./routes/users');
var admin=require('./routes/admin');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000000000,
    }
}));

// app.get('/?', function(req, res){
//     res.render('page404', {userName:req.session.user});
//     res.render('page404',{userName});
// });

//Validator
app.use(expressValidator({
    errorFormatter:function (param, msg, value) {
        var namespace=param.split('.'),
            root=namespace.shift(),
            formParam=root;
        while(namespace.length){
            formParam+='['+namespace.shift()+']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        };
    }
}));
//flash
app.use(require('flash')());
app.use(function (req, res, next){
   res.locals.success_msg=req.flash('success_msg');
   res.locals.error_msg=req.flash('error_msg');
   res.locals.error=req.flash('error');
   next();
});

app.use('/', routes);
app.use('/', users);
app.use('/', admin);

app.set('view engine', 'ejs');//какой шаблонизатор используем

app.use('/public', express.static('public'));//подключаем статические переменные, находятся в папке public, ссылка /public

require('./db/passport')(passport);


app.listen(3500);//порт, который слушаем