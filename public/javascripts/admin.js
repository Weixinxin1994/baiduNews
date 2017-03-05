    var $page = 0; //声明页数记录量
    var upNext = 1; //上一页下一页按钮记录量
    var goup_order = true; //升降序开关量
    pageFun(1); //执行初始化页面数据分页函数
    //初始化分页函数
    function pageFun(num) {
        var dataNum = 10; //每页显示
        $.ajax({
            url: 'admin/start',
            type: 'get',
            success: function(data) {
                var Arr = data; //获取后台数据
                if (!goup_order) {
                    Arr = data.reverse();
                } //如果升降开关量为false;设置数组为降序
                var dataArr = Arr.slice((num - 1) * dataNum, num * dataNum); //动态截取数组 截取公式-当前页数减1*每页信息数至 当前页数*每页信息数
                $page = Math.ceil(data.length / dataNum); //计算页码，全部数据除以每页条数 计算向上取正
                $('.ajax_data').remove(); //先清除已经有数据
                for (var i = 0; i < dataArr.length; i++) { //遍历数组动态添加元素操作
                    $('<tr class="ajax_data">' +
                        '<td class="id">' + dataArr[i].id + '</td>' +
                        '<td class="title">' + dataArr[i].title.substring(0, 8)+'...'+ '</td>' +
                        '<td class="classify">' + dataArr[i].classify + '</td>' +
                        '<td class="time">' + dataArr[i].time + '</td>' +
                        '<td>' +
                        '<button type="button"class="news_btn btn btn-warning btn-sm" name="alterId" data-toggle="modal" data-target="#myModal">修改</button>' +
                        ' ' + '<button type="button"class="news_btn btn btn-danger btn-sm" name="delete" data-toggle="modal" data-target="#myModal">删除</button>' +
                        '</td>' +
                        '</tr>').appendTo('.table');

                }
                pageNumFun($page); //执行页面插入函数
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    //创建页码插入函数
    function pageNumFun(page) {
        if ($('.pageBtn').length == page) return; //如果页码按钮和页数相等结束函数执行 反之执行会下操作
        $('.pageBtn').remove(); //先清除已经有的页码按钮
        for (var i = 0; i < page; i++) { //循环创建页码按钮
            $('<li class="pageBtn"><a href="javascript:void(0)">' + (i + 1) + '</a></li>').insertBefore('.NextBtn'); //在下一页按钮前面插入页码按钮
            if (i === 0) {
                $('.pageBtn').addClass('active'); //给第一个页码按钮添加高亮
            }
        }
    }
    //页码按钮点击事件
    $('.pagination').on('click', '.pageBtn', function() {
        var num = $(this).find('a').text(); //获取当前页码按钮中的数字
        $(this).addClass('active').siblings().removeClass('active'); //这当前按钮高亮，清除其他按钮高亮
        pageFun(num); //执行页码函数将数字传入
        upNext = num; //上一页下一页按钮记录量，以便翻页准确
    });
    //下一页按钮点击操作
    $('.NextBtn').click(function() {
        $('.ajax_data').remove(); //先清除已经有数据
        upNext++; //执行递增操作
        if (upNext == $page + 1) { //因为记录零从1开始要翻到最后一页累加要比页数大1，所以页数加1
            upNext = 1;
        }
        pageFun(upNext); //执行页码函数将记录量传入函数
        $($('.pageBtn')[upNext - 1]).addClass('active').siblings().removeClass('active'); //给当前页码按钮添加高亮 元素从0开始所以-1
    });
    //上一页按钮点击操作
    $('.upBtn').click(function() {
        $('.ajax_data').remove(); //先清除已经有数据
        if (upNext == 1) { //因为记录零从1开始要翻到最后一页累加要比页数大1，所以页数加1
            upNext = $page + 1;
        }
        upNext--; //执行递增操作
        pageFun(upNext); //执行页码函数将记录量传入函数
        $($('.pageBtn')[upNext - 1]).addClass('active').siblings().removeClass('active'); //给当前页码按钮添加高亮 元素从0开始所以-1
    });
    //升序降序操作事件
    $('.goup_order').change(function() {
        if ($(this).val() == '升序排列') { //判断选择框的值设置升降序开关量
            goup_order = true; //升序
        } else {
            goup_order = false; //降序
        }
        pageFun(1); //执行初始化页面数据分页函数
        $('.pageBtn').remove(); //先清除已经有的页码按钮
        upNext = 1; //重置翻页按钮记录量
    });
    var send_data; //公用请求数据变量
    var imgIndex = 1; //设置增减图片记录量
    var hintObj = { //操作提示信息对象
        add: '是否确认添加新闻?',
        update: '是否确认保存修改?',
        delete: '是否确认删除新闻?',
        alterId: '是否要修改新闻?'
    };
    var okObj = { //成功提示信息对象
        add: '新闻发布成功',
        update: '保存修改成功',
        delete: '删除新闻成功'
    };
    //增删改查按钮提交操作
    $('.newBox').on('click', '.news_btn', function(e) {
        e.preventDefault(); //取消表单默认提交行为
        send_data = dataObj(this); //执行创建发送到后台数据对象函数 将this传入
        console.log(send_data);
        $('#myModal .modal-body').html('<p>' + hintObj[send_data.set] + '</p>'); //将操作提示框的文本设置为对应的信息对象
    });

    //执行ajax请求提示框
    $('#yes').click(function() { //确认按钮执行ajax请求事件
        $('#myModal').modal('hide');
        $.ajax({
            url: 'admin/set',
            type: 'post',
            data: send_data,
            success: function(data) {
                if (send_data.set == "alterId") { //如果是修改按钮将数据获取到添加到左侧操作台
                    alterFun(data); //执行修改操作函数
                } else {
                    if (send_data.set == "update") { //保存成功后将按钮设置为发布新闻，恢复出事样式
                        $('.upd').find('.id').text(send_data.id); //设置修改后的内容对应被修改的行
                        $('.upd').find('.title').text(send_data.title.substring(0, 8)+'...');
                        $('.upd').find('.classify').text(send_data.classify);
                        $('.upd').find('.time').text(send_data.time);
                        $('#btn').attr({
                            class: 'btn btn-primary news_btn',
                            name: 'add'
                        }).text('发布新闻');
                    }
                    if (send_data.set == "add" || send_data.set == "delete") { //如果是添加和删除按钮
                        if (send_data.set == "delete") {
                            $('.del').remove();
                        } //如果是删除按钮
                        $($('.pageBtn')[0]).addClass('active').siblings().removeClass('active'); //将第一个页码按钮高亮
                        upNext = 1; //重置翻页按钮记录量
                        pageFun(1); //执行初始化页面数据分页函数
                    }
                    //清空图片地址框，恢复出事状态
                    $('div[class*="Igbox"]').remove();
                    //重制表单
                    $('.form-horizontal')[0].reset();
                    //显示成功提示框
                    $('#myModal_ok').modal('show').find('.modal-body').html('<p>' + okObj[send_data.set] + '</p>');
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    //创建发送到后台的数据函数
    function dataObj(element) {
        var data = $(element).attr('name'); //判断按钮的name属性 判断增删改查操作
        var send_data = {}; //声明发送到后台的数据对象
        if (data == 'add' || data == 'update') { //如果是添加
            var imgArr = []; //创建图片地址数组
            $('.upImage').each(function(i, e) { //遍历图片地址文本框
                imgArr.push($(e).val()); //将地址添加到imaArr数组中
            });
            var ImgDate = imgArr.join(','); //将数组转化成字符串
            var _title = $('#title').val(); //获取标题
            var _time = $('#time').val(); //获取时间
            var _classify = $('#classify').val(); //获取分类
            var _style = $('input[set="style"]').attr('class'); //获取样式
            var _content = $('#content').val(); //获取内容
            var _src = $('#src').val(); //获取来源
            send_data = { //设置发送的数据
                title: _title,
                classify: _classify,
                time: _time,
                imgurl: ImgDate,
                style: _style,
                content: _content,
                src: _src,
                set: data
            };
            if (data == 'update') {
                send_data.id = $('.upd .id').text(); //如果是保存修改按钮获取被添加了class属性为upd的元素下的id的文本值
            }
        } else {
            var _ID = $(element).parents('tr').find('.id').text(); //获取新闻id值
            if (data == "alterId") { //如果是修改按钮将夫元素添加updclass属性
                $(element).parents('tr').addClass('upd').siblings().removeClass('upd');
            }
            if (data == "delete") { //如果是删除按钮为按钮夫元素添加delclass属性
                $(element).parents('tr').addClass('del').siblings().removeClass('del');
            }
            send_data = {
                id: _ID,
                set: data
            }; //设置发送的数据
        }
        return send_data; //返回发送数据
    }


    //时间格式插入时间
    $('.timebtn').click(function() {
        var date = new Date(); //创建时间对象
        var Y = date.getFullYear(); //获取年份
        var M = date.getMonth() + 1; //获取月份 +1是因为默认从0开始
        var D = date.getDate(); //获取日
        var H = date.getHours(); //获取时
        var m = date.getMinutes(); //获取分
        var s = date.getSeconds(); //获取秒
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var dates = Y + '-' + M + '-' + D + " " + H + ':' + m + ':' + s;
        $('#time').val(dates); //将发布时间文本框的值设置为当前时间
    });

    //增加图片按钮事件
    $('.plus_img_btn').click(function() { //点击添加插入图片框，并设置记录量递增标记class为Igbox + imgIndex
        $(this).before('<div class="input-group Igbox' + imgIndex + '">' +
            '<input type="text" class="form-control upImage" placeholder="点击选择要插入图片">' +
            '<div class="input-group-addon files_box">' +
            '<input type="file" id="exampleInputFile" class="files" name="upload" multiple="multiple">' +
            '</div></div>');
        imgIndex++; //递增操作
    });
    $('.plus_up_btn').click(function() { //点击删除插入图片框，并设置记录量递增标记class为Igbox + imgIndex
        imgIndex--; //增减记录量递减操作
        var Igbox = '.Igbox' + imgIndex;
        $(Igbox).remove(); //删除插入框
    });
    //图片上传事件
    $('.images_box').on('change', '.input-group .files', function() { //设置选择文件上传表单的值改变事件
        var $formData = $("#FuploadImages")[0]; //获取表单元素
        var upImages = new FormData($formData); //创建文件上传对象 即表单的数据
        console.log(this.files[0]);
        var $this = this; //获取this指向以便ajax调用
        $.ajax({
            url: 'admin/upload', //请求地址
            type: 'post', //请求类型
            data: upImages, //发送到后台的数据
            async: true, //是否异步
            cache: false, //是否开启缓存
            contentType: false, //内容类型
            processData: false, //数据处理 还不理解
            success: function(data) { //成功后将图片地址插入到对应文本框中
                $($this).parent().siblings('.upImage').val(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    //修改操作函数
    function alterFun(data) {
        $('div[class*="Igbox"]').remove();
        $('#title').val(data[0].title); //获取标题
        $('#classify').val(data[0].classify); //获取分类
        $('#time').val(data[0].time); //获取时间
        $('#content').val(data[0].content); //获取时间
        $('#src').val(data[0].src);
        var imgArr = data[0].imgurl.split(','); //获取图片地址转化为数组
        for (var i = 0; i < imgArr.length; i++) {
            if (i === 0) { //直接将第一个地址地址插入到页面初始第一个图片插入框中
                $('.upIone').val(imgArr[0]);
            } else { //反之创建地址框，并对应插入图片地址
                $('.plus_img_btn').before('<div class="input-group Igbox' + i + '">' +
                    '<input type="text" class="form-control upImage" placeholder="点击选择要插入图片">' +
                    '<div class="input-group-addon files_box">' +
                    '<input type="file" id="exampleInputFile" class="files" name="upload" multiple="multiple">' +
                    '</div></div>');
                $('.Igbox' + i).find('.upImage').val(imgArr[i]); //对应插入图片地址
                imgIndex = i + 1; //重设添加图片连接框的记录量，一边增减图片使用
            }
        }
        //遍历样式单选按钮
        $('input[name="style"]').each(function(i, e) {
            if (data[0].style == e.className) { //对应回去样式选定
                e.checked = true;
            }
        });
        //将发布按钮改为保存修改
        $('#btn').attr({
            class: 'btn btn-warning news_btn',
            name: 'update'
        }).text('保存修改');

        //设置重置按钮为取消修改
        $('.conceal').text('取消修改');
    }

    //新闻样式事件
    $('input[name="style"]').click(function() { //选择当前样式为当前按钮设置set属性，以便获取数据
        $(this).attr('set', 'style').parent().siblings().find('input[name="style"]').removeAttr('set');
    });

    //重置按钮事件
    $('.conceal').click(function(){
      if($('#btn').attr('name')=='update'){
        $(this).text('重置');
        $('#btn').attr({
            class: 'btn btn-primary news_btn',
            name: 'add'
        }).text('发布新闻');
      }
      //重制表单
      $('.form-horizontal')[0].reset();
      $('div[class*="Igbox"]').remove();
    });
    //退出按钮事件
    $('#SignOut').click(function(){
      $.ajax({
           url:'admin/SignOut',
           type:'get',
           success:function(data){
             if(!data){
               location.href ="/";
             }
           }
      });
    });
