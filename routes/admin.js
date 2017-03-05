var express = require('express');
var router = express.Router();
var connection = require('../module/mysql_connect');
var formidable = require('formidable');
var fs = require('fs');
//模版渲染
router.get('/', function(req, res, next) {
  //用session控制控制访问后台 如果已经成功登陆直接进入admin页面 反之进入登陆页面
  if(req.session.username){
    var username = req.session.username ;//获取username
    res.render('admin',{user:username});
  }else{
    res.redirect('/login');
  }
});

//初始化获取数据
router.get('/start', function(req,res,next){
  connection.enter.query('select * from news',function(err,rows,fd){
    if(err) {
      console.log(err);
      return;
    }
     res.send(rows);
  });
});

//退出请求设置
router.get('/SignOut', function(req, res, next) {
     req.session.username='';
     res.send(req.session.username);
});

//增删改差请求路由设置
router.post('/set', function(req, res, next) {
  var set = req.body.set; //获取请求操作数据类型
  var data = req.body; //整个请求数据对象
  connection.anption(set,data,function(err,rows){ //执行数据库操作
    if(err){
        console.log(err);
      }else{
        res.send(rows);//将数据发送到前台
      }
  });
});

  //图片上传请求
  router.post('/upload',function(req,res,next){
    var form = new formidable.IncomingForm(); //创建上传表单
         form.encoding = 'utf-8'; //设置编辑
         form.uploadDir = 'public/upload'; //设置上传目录
         form.keepExtensions = true; //保留后缀
         form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
         form.type = true;
         form.parse(req, function(err, fields, files) { //获取上传文件信息
           if(err){ //如果错误
               res.send('上传失败请重试！');
           }else{ //成功则返回图片地;
             var urls = files.upload.path.replace('public','.'); //设置文件地址
              res.send(urls);


           }
         });
  });


module.exports = router;
