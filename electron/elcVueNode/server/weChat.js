const express = require('express')
const app = express()
var count = 0;
// webSocket
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
server.listen(3001)
io.sockets.on('connection',(socket)=>{
    count++;
    socket.emit('users',{number:count})
    socket.on('start', () => {
        socket.emit('start_response', true)
    })
    socket.on('message', (data) => { // 接收消息后 转发给其他用户
        socket.broadcast.emit('updateMsg', data)
    })
})
