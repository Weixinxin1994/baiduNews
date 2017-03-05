var express = require('express');
var router = express.Router();
var connection = require('../module/mysql_connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  //默认打开首页自动全部读取数据库
  connection.enter.query('select * from news',function(err,rows,fd){
     res.render('index',{data:rows.reverse()});
  });
});
//进入新闻内容
router.get('/newsContent/:urlpath',function(req,res,next){
      var pathsId =  parseInt(req.params.urlpath.split('_')[1]);//获取新闻地址内容,获取其中动态添加的id信息
      connection.anption('select',pathsId,function(err,rows){ //执行数据库操作
        if(err){
            console.log(err);
          }else{
           res.render('newsContent',{data:rows});//渲染页面
          }
      });
});
//分类新闻请求路由
router.post('/',function(req,res,next){
  var reqClass = req.body.reqClass; //获取请求操作数据类型
  var text = req.body.text; //整个请求数据对象
  if(reqClass=='all'){
    connection.enter.query('select * from news',function(err,rows,fd){
       res.send(rows.reverse());

    });
    return;
  }
  connection.anption(reqClass,text,function(err,rows){ //执行数据库操作
    if(err){
        console.log(err);
      }else{
        res.send(rows.reverse());//将数据发送到前台
      }
  });
});

module.exports = router;
