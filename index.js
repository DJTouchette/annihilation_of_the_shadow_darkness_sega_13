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
    id += 1;

    console.log(user.length);

    if (id < 3){
      socket.user = id;
      user.push(socket.user);
      socket.join('game');

      socket.in('game').emit('turnChange');

      console.log('a user connected' + ' ' + 'Id:' + ' ' + socket.user);

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

    socket.on('endTurn', function () {

      socket.in('game').emit('turnChange');

    });


    socket.on('spriteMoved', function (unit) {

      socket.in('game').emit('spriteClass', unit);


    });

    socket.on('waiting', function () {

      socket.in('game').emit('waiting');

    });

    socket.on('victory', function() {

      socket.in('game').emit('win');

    });

    socket.on('defeat', function() {

      socket.in('game').emit('lose');

    });

    socket.on('barChange', function (params) {

      socket.in('game').emit('setBar', params);
      console.log(params);

    });

    socket.on('moraleChange', function (params) {

      socket.in('game').emit('setMorale', params);
      console.log(params);

    });


  });





http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.use(express.static(__dirname + '/public'));
