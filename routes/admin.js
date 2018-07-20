var express=require('express');
var router=express.Router();
var User=require('../db/user');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session
var Admin=require('../db/admin');
var fs=require('fs');
var bodyParser = require('body-parser');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
const { check, validationResult } = require('express-validator/check');

var userName=false;
var userRole=false;


//admin
router.get('/admin',function (req,res) {//маршрутизация на admin
    req.session.user ? res.render('admin',{userName:req.session.user,userRole:req.session.role}) :
        res.render('admin',{userName,userRole});
});

//add content,[check('name').isLength({ min: 5 })]

router.post('/admin',function (req,res) { //маршрутизация на registration

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.multiples = false;
    form.parse(req, function(err, fields, files) {
        if (err){
            res.json({
                result:'failed',
                data:{},
                messege:'Cannot upload img.Err:${err}'

            });
        }
        else{
            //res.end(util.inspect({fields: fields, files: files}));
            var name =  fields.name;
            var description =  fields.description;
            var price =  fields.price;
            var img =  files.img.name;
            let content = new Admin();
                 content.name =  fields.name;
                 content.description =  fields.description;
                 content.price =  fields.price;
                 content.img =  files.img.name;
                 content.presence='yes';
                 content.save();
            //res.redirect('/');
            // res.render('admin', {
            //
            //     userName,userRole
            //
            // });

            form.on('error', function(err) {
                console.log(err);
            });

            form.on('fileBegin', function (name, file){
                file.path = __dirname + '/../public/img/' + file.name;
            });

            form.on('file', function (name, file){
                console.log('Uploaded ' + file.name);
            });
        }
    });
});

// router.post('/admin',function (req,res) { //маршрутизация на registration
//
//     var name =  req.body.name;
//     var description =  req.body.description;
//     var price =  req.body.price;
//     var img =  req.body.img;
    //validator
   //  req.checkBody('name', 'Name is required').notEmpty();
   //  req.checkBody('description', 'Description is required').notEmpty();
   // // req.checkBody('img', 'Is not images').matches(/(?:jp(?:e?g|e|2)|gif|png|tiff?|bmp|ico)/);
   //  req.checkBody('price', 'Price is required').notEmpty();
   //  req.checkBody('price', 'must contain a number').matches(/\d/);//вводить число 'png', 'jpeg','jpg'
   //  var errors=req.validationErrors();
   //  if (errors){
   //      res.render('admin',{
   //          errors:errors,
   //          userName,
   //          userRole
   //      });
   //  }
   // else{
   //      let content = new Admin();
   //      content.name =  req.body.name;
   //      content.description =  req.body.description;
   //      content.price =  req.body.price;
   //      content.img =  req.body.img;
   //      content.presence='yes';
   //      content.save();
   //      console.log(req.body.name);
        //req.flash('success_msg', "You ar registered");
        //res.redirect('/admin');
   // }
//});

module.exports = router;