var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = [];
var id = 0;
var currentPlayer;

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
      if (id > 1){
        socket.in('game').emit('turnChange', id, 'topside');
      }
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

    socket.on('endTurn', function (currentGroup) {
      console.log('endTurn started by User ' + socket.user)
      currentPlayer = socket.user
      socket.in('game').emit('turnChange', currentPlayer, currentGroup);

    });


    socket.on('spriteMoved', function (unit) {

      socket.in('game').emit('spriteClass', unit);


    });

    socket.on('waiting', function () {

      socket.in('game').emit('waiting');

    });

    socket.on('checkUser', function() {
      console.log('USER IS: ' + socket.user);
      socket.in('game').emit('thisUser', socket.user)
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


    socket.on('chat message', function(msg){

      var deliver = ["Player " ,socket.user ,  ": ", msg];
      io.in('game').emit('chat message', deliver );
      console.log(msg);

    });

    socket.on('PlayerMoved', function(group){
      socket.in('game').emit('newGroup', group);
      console.log('In PlayerMoved the group is:', group);
    });

    socket.on('currentGroup', function(group){
      socket.in('game').emit('group', group);
    })

    socket.on('change', function(group){
      socket.in('game').emit('groupNow', group);
    })

  });



http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.use(express.static(__dirname + '/public'));
