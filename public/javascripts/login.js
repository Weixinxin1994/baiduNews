//点击事件
$('.login_btn').click(function(e){
   e.preventDefault();//取消表单默认提交行为
   loginFun();
 });
// 回车事件
 $(document).keyup(function(e){
  if(e.keyCode==13){
  loginFun();
}
});
//请求登陆函数
 function loginFun(){
   var _user = $('.user').val();
   var _pass = $('.pass').val();
   $.ajax({
     url:'login/go',
     type:'post',
     data:{username:_user,password:_pass},
     success:function(data){
         if(data=='ok'){
            location.href ="admin";
         }else{
           $('.text').show().find('p').text(data);
         }
     },
     error:function(err){
       console.log(err);
     }
   });
 }
