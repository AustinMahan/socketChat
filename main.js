var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);


server.listen(8080);
server.use(cors)
var io = require('socket.io')(server);
var messeges = []

io.on('connection', function (socket) {
  console.log('user connected');

  socket.on('getMsgs', function() {
    socket.emit('msgs', messeges)
  })

  socket.on('sending', function (data) {
    messeges.push(data)
    socket.emit('msgs', messeges);
  });
});
