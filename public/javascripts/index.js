//初始化设置头部主导航的样式
  var menuLi = 100/6;
  imgSize();
  $('.menu>ul>li').css('width',menuLi+'%');
  $('.mlw_2').css('width',menuLi*2+'%');
  $('.menu>ul>li').click(function(){
      $(this).find('a').addClass('menu_A');
      $(this).siblings().find('a').removeClass('menu_A');
      classifyFun(this);
  });
   //轮播图和滚动信息
  var imgBoxW= $('.imgBox img').length*16;
  $('.imgBox,.showUl').css('width',imgBoxW+'rem');
  var showFun=function(){
       $('.imgBox,.showUl').css({'transition':'all .3s','left':'-'+16+'rem'});
  };
  var rollMsgFun = function(){
     $('.rollMsg_list>ul').css({'transition':'all .5s ease-out','top':'-'+18+'px'});
  };
  //监听transition过渡效果执行完成后调整操作
  $('.show').on('transitionend','.imgBox',function(){
       $('.imgBox img:first').appendTo('.imgBox');
       $('.showUl li:first').appendTo('.showUl');
       $('.imgBox,.showUl').css({'transition':'','left':0});
  });
  $('.rollMsg_list').on('transitionend','ul',function(){
       $('.rollMsg_list>ul>li:first').appendTo('.rollMsg_list>ul');
       $('.rollMsg_list>ul').css({'transition':'','top':0});
  });
  setInterval(showFun,3000);
  setInterval(rollMsgFun,5000);
  //图片多图尺寸
  function imgSize(){
    $('.more img,.odd .list_img').css('width',100/3+'%');
    $('.odd_right').css('width',(100/3)*2+'%');
  }
//分类ajax请求函数
function classifyFun(element){
  var _text = $(element).text();
  var _reqClass = $(element).attr('name');
  $.ajax({
    url:'/',
    type:'post',
    data:{text:_text,reqClass:_reqClass},
    success:function(data){
      $('.news_list_content').remove();
      for(var i=0;i<data.length;i++){
        if(data[i].style=='odd'){
         $('<div class="news_list_content odd">'+
         '<div class="list_img"><a href="newscontent/url='+data[i].time+
         '_'+data[i].id+'.html"><img src="'+data[i].imgurl+'"></div>'+
         '<div class="odd_right">'+
         '<a href="newscontent/url='+data[i].time+'_'+data[i].id+'.html">'+
         '<h1>'+data[i].title+'</h1>'+
         '<p>'+data[i].time.slice(0,9)+'<span>'+data[i].src+'</span></p>'+
         '</a></div></div>').appendTo('.news_list');
       }else{
         var daImgArr = data[i].imgurl.split(',');
         $('<div class="news_list_content more">'+
         '<h1><a href="newscontent/url='+data[i].time+'_'+data[i].id+'.html">'+data[i].title+'</a></h1>'+
         '<div class="list_img"><a href="newscontent/url='+data[i].time+'_'+data[i].id+'.html">'+
         '<img src="'+daImgArr[0]+'"><img src="'+daImgArr[1]+'"><img src="'+daImgArr[2]+'"></a></div>'+
         '<p><a href="newscontent/url='+data[i].time+'_'+data[i].id+'.html">'+
         data[i].time.slice(0,9)+'<span>'+data[i].src+'</span></a></p>'+
         '</div>').appendTo('.news_list');

       }
     }
    imgSize();//重置样式
   },
    error:function(err){
      console.log(err);
    }
  });
}

// 动态设置html font-size
!(function(doc, win) {
var docEle = doc.documentElement,
    evt = "onorientationchange" in window ? "orientationchange" : "resize",
    fn = function() {
        var width = docEle.clientWidth;
        width && (docEle.style.fontSize = 20 * (width / 320) + "px");
    };
win.addEventListener(evt, fn, false);
doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));
