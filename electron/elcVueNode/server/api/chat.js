var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')
var conn = mysql.createConnection(models.mysql)
const io = require("socket.io")

conn.connect()
var pool = mysql.createPool( models.mysql );
// 响应一个JSON数据

// connection.release()

module.exports = router
