var Express = require('express');
var Socket = require('socket.io');
var http = require('http');
var cors = require('cors');

var app = Express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors())

var server = http.createServer(app);
var io = Socket(server);

// app.use(Express.static('public'));

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
