var express = require('express');
var router = express.Router();
var connection = require('../module/mysql_connect');
//登陆验证请求
router.get('/',function(req,res,next){
      if(req.session.username){
         res.redirect('/admin'); //如果成功登陆过转到admin页面
      }else{
         res.render('login');//如果没有登陆过或者失败留在登陆页面
      }

});

router.post('/go',function(req,res,next){
      var user = req.body.username; //获取输入的账号
      var pass = req.body.password; //获取输入的密码
      var sqluser,sqlpass; //声明保存数据库用户名和密码信息
      connection.enter.query('select * from login',function(err,rows,fd){ //查询登陆数据
              (function sel(i){
                if(i==rows.length) return;
                if(user==rows[i].username&&pass==rows[i].password){
                 sqluser=rows[i].username;
                 sqlpass=rows[i].password;
                }
                sel(i+1);
                })(0);
          if(user==sqluser&&pass==sqlpass){ //如果账户和密码正确
            req.session.username=user;
            res.send('ok');
          }else{
            res.send('登陆失败:用户名或密码错误或为空!');
          }
      });
});
module.exports = router;
