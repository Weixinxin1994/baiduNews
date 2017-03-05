## 百度新闻移动nodejs开发实战
前端页面手写实现页面和轮播图自适应效果，后台页面用bootstrap搭建,数据交互用nodejs+express实现，渲染的模版引擎用的ejs,基本功能有上传图片,对前台新闻的样式设置，对信息数据的增删改查操作，还有一些细节地方还有些不足希望多多指教。如果想参考学习请看安装方法. 
######github无法配置nodejs的运行环境就不放出演示地址了请看效果图展示.
###效果展示
![demo](https://raw.githubusercontent.com/hxshun/baiduNews/master/demoimg/demo1.png)

![demo](https://raw.githubusercontent.com/hxshun/baiduNews/master/demoimg/demo2.png)

![demo](https://raw.githubusercontent.com/hxshun/baiduNews/master/demoimg/demo3.png)

![demo](https://raw.githubusercontent.com/hxshun/baiduNews/master/demoimg/demo4.png)

![demo](https://raw.githubusercontent.com/hxshun/baiduNews/master/demoimg/demo5.png)

###目录结构
```
|--bin express生成配置文件目录
|--module 自制模块目录
|--views 动态模版目录
|--public 网站主目录
|--roues 路由目录
|--package.json nodejs项目配置文件
|--sqlbackup sql数据备份文件存放目录
```
###安装方法
首先必须安装nodejs和npm还有mysql,将sqlbackup目录下的sql文件导入到数据，进入项目目录，执行npm install 安装依赖包，然后即可执行npm start 或者 node app.js 即可将程序运行起来。通过访问localhost:8080即可设置和调试，后地址是localhost:8080/admin,账户和密码都是admin。

还有很多不足的地方希望大家一起讨论学习，如需使用请自行扩展和修改


