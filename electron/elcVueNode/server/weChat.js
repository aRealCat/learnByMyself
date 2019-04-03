const express = require('express')
const app = express()

// webSocket
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
server.listen(3001)
io.sockets.on('connection',(socket)=>{
    socket.on('start', () => {
        socket.emit('start_response', true)
    })
    socket.on('message', (data) => {
    })
})
