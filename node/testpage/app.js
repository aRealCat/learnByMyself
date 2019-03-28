// var http = require('http'); 
// http.createServer(function(req, res) {
//  res.writeHead(200, {'Content-Type': 'text/html'}); 
//  res.write('<h1>Node.js</h1>'); 
//  res.end('<p>Hello World</p>'); 
// }).listen(3003);
var fs = require('fs'); 
fs.readFile('json.json','utf-8', function(err, data) { 
 if (err) { 
 console.error(err); 
 } else { 
 console.log(data); 
 } 
});