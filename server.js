const express = require('express')
const path = require('path')

const App = express()

const server = require('http').createServer(App)

App.use(express.static(path.join(__dirname + '/public')))

server.listen(3001)