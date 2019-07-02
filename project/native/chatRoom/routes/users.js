var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
var express = require('express');
var router = express.Router();
// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
      res.json({
          code: '-200',
          msg: '操作失败'
      });
    } else {
      res.json(ret);
    }
};
// 注册
router.get('/reg',function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
      let param = req.query || req.params
      let account = param.account
      let password = param.password
      let _res = res
      connection.query(userSQL.queryAll, function (err, res) {
          let isreg = false
          if(res){ // 判断用户是否已注册
              for (let i=0; i<res.length; i++) {
                  if(res[i].account == account) {
                    isreg = true
                  }
              }
          }
          var data = {res}
          data.isreg = isreg // 是否注册
          data.result = true
          if(isreg) {
            data.msg = '该账号已被注册'
          } else {
              connection.query(userSQL.insert, [param.account,param.password,param.name], function (err, result) {
                  if(result) {
                      data.msg = '注册成功'
                  } else {
                      data.result = false
                      data.msg = '注册失败'
                  }
              })
          }
          if(err) data.err = err
          setTimeout(function () {
              responseJSON(_res, data)
          },300)
          // 释放链接
          connection.release()

      });
  });
})
// 用户登录
router.get('/login',function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;
      var account = param.account;
      var password = param.password;
      var _res = res;
      connection.query(userSQL.queryAll, function (err, res, result) {
          console.log(err, res, result)
          var isTrue = false
          let user = {}
          if(res){
              for (var i=0;i<res.length;i++) {
                  if(res[i].account == account && res[i].password == password) {
                      isTrue = true;
                      user = res[i]
                  }
              }
          }
          var data = {};
          data.result = true
          data.allUsers = res
          data.user = user
          data.mypost = {account, password}
          data.isLogin = isTrue
          if(isTrue) {
          } else {
          }
          if(err) data.err = err;
          // 以json形式，把操作结果返回给前台页面
          responseJSON(_res, data);

          // 释放链接
          connection.release();

      });
  });
})
module.exports = router;
