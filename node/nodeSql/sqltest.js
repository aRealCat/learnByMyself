var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'zxc3dian14',
  database : 'node'
});
connection.connect()
var  sAddSql = 'INSERT INTO students(name,age,id) VALUES(1,17,3)';
connection.query(sAddSql, (err, res) => {
    console.log(err, res)
})
connection.end()
 