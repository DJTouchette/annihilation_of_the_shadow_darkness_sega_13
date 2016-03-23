var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = [];
var id = 0;

app.get('/', function(req, res){
  res.sendfile('views/index.html');
});

  io.on('connection', function(socket){
    console.log(user.length);
    id += 1;
    if (id < 3){

      user.push(socket.conn.id);
      socket.join('game');
      console.log('a user connected' + ' ' + 'Id:' + ' ' + id);

    } else {
      socket.disconnect(socket);
      console.log('fuck off');
    }
    socket.on('disconnect', function(msg){
      console.log('user disconnected');
    });
    socket.on('pop', function() {
      // socket.broadcast.emit("SOMEONE_POPPED");
      socket.in('game').emit('SOMEONE_POPPED');
      console.log("haaaay");
    });
  });



http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.use(express.static(__dirname + '/public'));
