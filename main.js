var app = require('express')();
var cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*:*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST");
  next();
});
var server = require('http').Server(app);
var io = require('socket.io').listen(server, {log:false, origins:'*:*'});


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
