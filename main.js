var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use(cors)

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
