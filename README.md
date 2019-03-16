# learnByMyself
学习的小笔记
1.前端打包的dist资源， index.html要放在views, 而static文件(css js等)放在publice
  app.use(express.static(path.join(__dirname, 'public')));
2.Express使用html模板: ejs
  var ejs = require('ejs')  app.engine('html', ejs.__express); app.set('view engine', 'html');
  https://www.cnblogs.com/-nothing-/p/4943354.html


demo: 
1.登录注册 https://www.cnblogs.com/Leo_wl/p/4361289.html
2.express 项目初始化 结构解读：https://www.cnblogs.com/liujiale/p/6023367.html
  __dirname 表示当前文件所在的目录的绝对路径
  __filename 表示当前文件的绝对路径
  module.filename ==== __filename 等价

新浪云部署node项目 :
http://blog.sina.com.cn/s/blog_15b78cf500102xdrv.html
