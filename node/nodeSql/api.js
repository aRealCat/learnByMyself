var express = require('express');
var app = express();

app.all('*', function(req, res, next) {             //设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
var infor = [                       //传前端的数据
    {
        name:'jay',
        age:20,
        sex:'男',
        hobby:'basketball'
    },
    {
        name:'贼好玩',
        age:23,
        sex:'女',
        hobby:'shopping'
    },
    {
        name:'高渐离',
        age:24,
        sex:'男',
        hobby:'music'
    },
    {
        name:'小红',
        age:28,
        sex:'男',
        hobby:'game'
    },
    {
        name:'Tony',
        age:24,
        sex:'男',
        hobby:'no'
    },
]


app.get('/api',function(req,res){       
    //配置接口api
    res.status(200),
    res.json(infor)
})

//配置服务端口
var server = app.listen(3002,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen at http://%s:%s',host,port)
})