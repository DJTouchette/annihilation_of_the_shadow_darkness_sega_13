var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendfile('views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(msg){
    console.log('user disconnected');
  });
  socket.on('pop', function() {
    console.log('POP!');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.use(express.static(__dirname + '/public'));
