var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = [];
var id = 0;
var currentPlayer;
var rules = 'How it works!';
var rules1 = 'You and your opponent are pulling for the moral of your soldiers.';
var rules2 = 'Get attacked, lose some moral.';
var rules3 = 'Attack another soldier gain some moral....simple enough?';
var rules4 = 'If you want more information about classes click here.';



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
      console.log('a user connected' + ' ' + 'Id:' + ' ' + socket.user);
    } else {

      socket.disconnect(socket);
      console.log('fuck off');

    }

    socket.on('disconnect', function(msg){

      console.log('user disconnected');

    });

    socket.on('pop', function() {

      socket.in('game').emit('SOMEONE_POPPED');
      console.log("haaaay");

    });

    socket.on('ruleTime', function () {

      if (socket.user === 2) {
        var allRules = [[rules], [rules1], [rules2], [rules3], [rules4]];
        io.in('game').emit('readEm', allRules);
      }

    });

    socket.on('spriteMoved', function (unit) {

      socket.in('game').emit('spriteClass', unit);


    });

    socket.on('waiting', function () {

      socket.in('game').emit('waiting');

    });

    socket.on('checkUser', function() {

      socket.in('game').emit('thisUser', socket.user);

    });

    // socket.on('victory', function() {

    //   socket.in('game').emit('lose');

    // });

    // socket.on('defeat', function() {

    //   socket.in('game').emit('lose');

    // });

    socket.on('redWins', function() {

      if (socket.user === 1) {
        socket.emit('win');
      } else {
        socket.emit('lose');
      }
    });

    socket.on('blueWins', function(){

      if (socket.user === 1) {
        socket.emit('lose');
      } else {
        socket.emit('win');
      }

    });

    socket.on('barChange', function (params) {

      socket.in('game').emit('setBar', params);

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

    socket.on('attack', function (msg) {

      var deliver = ['You lost ', msg, ' troops'];
      socket.in('game').emit('systemMsg', deliver);


    });

    socket.on('damageDone', function (msg) {

      var deliver = ['You took out ', msg[1], ' troops'];
      console.log(deliver);
      socket.in('game').emit('troopsKilled', deliver);

    });

    socket.on('attackMiss', function () {

      var deliver = ['Swing and a miss!!'];
      io.in('game').emit('miss', deliver);

    });

    socket.on('startGame', function () {

      if (socket.user === 1) {

        socket.emit('user1');

      }

      if (socket.user === 2) {
        //on player 2 join emit button to player 1
        socket.emit('user2');

      }

    });

    socket.on('groupTurn', function (group) {

      socket.in('game').emit('groupIs', [group, socket.user]);

    });


    socket.on('change', function(group){

    console.log('Side Change');
    socket.in('game').emit('groupNow', group, socket.user);

  });

  socket.on('switchIt', function () {
    // socket.in('game').emit('turnIt');
    socket.in('game').emit('makeBtn');

  });

  socket.on('flickTheSwitch', function () {
    console.log('Switched flicked');
    socket.in('game').emit('turnIt');

  });

  socket.on('killBtn', function() {

    console.log('Button b Gone');
    socket.in('game').emit('btnDestroyed');


  });


});



http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.use(express.static(__dirname + '/public'));
