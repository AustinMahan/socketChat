var app = require('express')();
var Socket = require('socket.io');
var http = require('http');

var server = http.createServer(app);
var io = Socket(server);

app.use(Express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
