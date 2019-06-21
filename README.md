# learnByMyself
学习的小笔记
1.前端打包的dist资源， index.html要放在views, 而static文件(css js等)放在publice
  app.use(express.static(path.join(__dirname, 'public')));
2.Express使用html模板: ejs
  var ejs = require('ejs')  app.engine('html', ejs.__express); app.set('view engine', 'html');
  https://www.cnblogs.com/-nothing-/p/4943354.html
3.HTTP 304状态码的详细讲解， 深入理解HTTP缓存机制及原理
  https://blog.csdn.net/huwei2003/article/details/70139062
  https://juejin.im/post/5c93ba526fb9a070ca103898

demo: 
1.登录注册 https://www.cnblogs.com/Leo_wl/p/4361289.html
2.express 项目初始化 结构解读：https://www.cnblogs.com/liujiale/p/6023367.html
  __dirname 表示当前文件所在的目录的绝对路径
  __filename 表示当前文件的绝对路径
  module.filename ==== __filename 等价

新浪云部署node项目 :
http://blog.sina.com.cn/s/blog_15b78cf500102xdrv.html

typescripts + vue:
1.请求本地json404问题

nodejs + websocket聊天室：https://www.cnblogs.com/Wayou/p/hichat_built_with_nodejs_socket.html
mysql: https://www.cnblogs.com/morgana/p/8491293.html

#全屏布局的几种方法
https://www.cnblogs.com/xiaohuochai/p/5458068.html
