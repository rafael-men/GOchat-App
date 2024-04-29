const express = require('express')
const path = require('path')

const App = express()

const server = require('http').createServer(App)

const io = require('socket.io')(server)

App.use(express.static(path.join(__dirname + '/public')))

io.on('connection',function(socket) {
    socket.on('newuser',function(username) {
        socket.broadcast.emit('update', username + ' joined the conversation')
    })
    socket.on('exituser',function(username) {
        socket.broadcast.emit('update', username + ' left the conversation')
    })
    socket.on('chat',function(message) {
        socket.broadcast.emit('chat', message)
    })
})
server.listen(3001)