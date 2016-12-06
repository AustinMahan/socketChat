var Express = require('express');
var Socket = require('socket.io');
var http = require('http');
var cors = require('cors');

var app = Express();
app.use(cors())

var server = http.createServer(app);
var io = Socket(server);

var messeges = []
io.on('connection', function (socket) {
  console.log('user connected');

  socket.on('getMsgs', function() {
    io.emit('msgs', messeges)
  })

  socket.on('sending', function (data) {
    messeges.push(data)
    io.emit('msgs', messeges);
  });
});

var port = process.env.PORT || 8080;
server.listen(port, function(){
  console.log('Now listening on port: ' + port);
})
