var express=require('express');
var router=express.Router();
var User=require('../db/user');
var db = require('../db/db');
var Admin=require('../db/admin');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session

var fs=require('fs');
var bodyParser = require('body-parser');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

var multer  = require('multer');
//var upload = multer({ dest: '/../public/img/' });
var path=require('path');

const { check, validationResult } = require('express-validator/check');

var userName=false;
var userRole=false;


//admin
router.get('/admin',function (req,res) {//маршрутизация на admin
    req.session.user ? res.render('admin',{userName:req.session.user,userRole:req.session.role}) :
        res.render('admin',{userName,userRole});
});

//add content,[check('name').isLength({ min: 5 })]
//3 multer
const storage=multer.diskStorage({
  destination:'./public/img/',
  filename:function(req, file, cd){
    cd(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage:storage,
  limits:{fileSize:1500000},
  fileFilter:function (req, file, cb) {
    checkFileType(file, cb);
}
}).single('img');

function checkFileType(file, cb){
  const filetypes=/jpg|jpeg|png|gif/;
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype=filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null,true);
  }else{
    cb('Error: Only image files are allowed!');
  }
}

router.post('/admin',function (req,res) {
  upload(req, res, (err)=>{
    if(err){
      res.render('admin',{
        msg:err,
        userName:req.session.user,
        userRole:req.session.role
        
      });
    }else{
      //validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('price', 'Price must contain a number').matches(/\d/);//вводить число 'png', 'jpeg','jpg'
    var errors=req.validationErrors();
    if (errors){
        res.render('admin',{
            errors:errors,
           userName:req.session.user,
           userRole:req.session.role
        });
    }else{
      db.contents.create({'name' : req.body.name, 
            'description':req.body.description, 
            'price':req.body.price, 'img':req.file.filename,'presence':'yes' }).then((contents) => {
             res.redirect('/admin'); 
          });
    }

      
    }
  })
});




//2
// router.post('/admin',function (req,res) { 

//     var form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.maxFieldsSize = 20 * 1024 * 1024;
//     form.multiples = false;
//     form.parse(req, function(err, fields, files) {
//         if (err){
//             res.json({
//                 result:'failed',
//                 data:{},
//                 messege:'Cannot upload img.Err:${err}'

//             });
//         }
//         else{
//           //res.end(util.inspect({fields: fields, files: files}));

//           db.contents.create({'name' : fields.name, 
//             'description':fields.description, 
//             'price':fields.price, 'img':files.img.name,'presence':'yes' }).then((contents) => {
//              res.redirect('/admin'); 
//           });
            
//             form.on('error', function(err) {
//                 console.log(err);
//             });

//             form.on('fileBegin', function (name, file){
//                 file.path = __dirname + '/../public/img/' + file.name;
//             });

//             form.on('file', function (name, file){
//                 console.log('Uploaded ' + file.name);
//             });
//         }
//     });
// });


//1

// router.post('/admin',function (req,res) { //маршрутизация на 
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