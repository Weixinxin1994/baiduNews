var mysql = require('mysql');
var setMySql={ //增删改查语句对象
    add:'insert into news set ?', //添加操作
    delete:'delete from news where id=?', //删除操作
    update:'update news set ? where id=', //修改操作
    select:'select * from news where id=?', //查询id操作
    classify:'select * from news where classify=?'
};
//创建数据库连接
var connection = {
  //建立数据库连接
  enter: mysql.createConnection({
          host:'localhost',
          user:'root',
          password:'880214hxs',
          database:'mydb'
  }),
  //数组操作即回调函数
  anption:function (set,data,callback){
        var sqlSet = setMySql[set]; //获取对应的sql语句
        var setData = data;//获取传来的数据
            if(set=='alterId'){ //如果是修改按钮
              selectFun(data.id); //直接将id传入
              return;//结束后续操作
            }
            if(set=='update'){
             sqlSet = sqlSet+data.id; //如果是保存修改按钮从新设置sql语句
            }
            if(set=='delete'){
              setData=data.id;
            }
      this.enter.query(sqlSet,setData,function(err,rows,fd){ //执行sql语句进行增删改查响应操作
        if(set=="add"){ //如果添加操作执行回调函数
          if(err){
            callback(err,null);//如果添加出错将错误传给回到函数
            return; //结束后续操作
          }else{
            selectFun(rows.insertId); //如果成功执行添加后查询数据操作，将当前添加数据的id传入
            return; //结束后续操作
          }
        }
        //默认直接执行
          callback(err,rows);//将错误信息和数据传给回调函数

     });
     function selectFun(datas){ //添加后查询当前添加数据操作函数
       connection.enter.query(setMySql.select,datas,function(err,rows,fd){ //执行sql语句进行增删改查响应操作
        callback(err,rows);//将错误信息和数据传给回调函数
      });
     }
  },
};
module.exports =  connection;
