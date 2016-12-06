var Express = require('express');
var Socket = require('socket.io');
var http = require('http');

var app = Express();
var server = http.createServer(app);
var io = Socket(server);

app.use(Express.static('public'));

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

var port = process.env.PORT || 8080;
server.listen(port, function(){
  console.log('Now listening on port: ' + port);
})
