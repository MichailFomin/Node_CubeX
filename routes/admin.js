var express=require('express');
var router=express.Router();
var User=require('../db/user');
var db = require('../db/db');
var Admin=require('../db/admin');
var cookieParser = require('cookie-parser');//подключаем cookie
var session = require('express-session');//session

var fs=require('fs');
var bodyParser = require('body-parser');

var multer  = require('multer');
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
  limits:{fileSize:2000000},
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



module.exports = router;