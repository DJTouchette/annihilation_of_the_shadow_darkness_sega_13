var socket = io();

socket.on('turnChange', function (currentPlayer, currentGroup) {

    updateUnit = [];
    console.log('turnChange started by User ' + currentPlayer)
    console.log('Current Group is :' + currentGroup)
    if (currentPlayer === 1 && currentGroup === 'bottomside'){
      endTurn('play');
    }else if (currentPlayer === 1 && currentGroup === 'topside'){
      endTurn();
    }else if(currentPlayer === 2 && currentGroup === 'topside'){
      endTurn('play');
    }
    else if (currentPlayer === 2 && currentGroup === 'bottomside'){
      endTurn();
    }
});

socket.on('waiting', function () {

  var msg = waiting();

});

socket.on('win', function() {

  victoryScreen();

});

socket.on('lose', function(){

  defeatScreen();
  // socket.in('game').emit('win');

});

socket.on ('spriteClass', function (unit) {
  var UnitArr = allUnits[unit.index];
  // unit.index = unit.index -1;
  // console.log('this is turn:' + turn);
  console.log(unit);

  UnitArr.x = unit.x;
  UnitArr.y = unit.y;
  UnitArr.atk = unit.atk;
  UnitArr.def = unit.def;
  UnitArr.spd = unit.spd;
  UnitArr.troops = unit.troops;

  turnSwitch = true;


});

socket.on('chat message', function(deliver){

  $('#messages').append($('<li>').text(deliver.join('')));
  var lastMessage = $('#messages');
  var height = lastMessage[0].scrollHeight;
  lastMessage.scrollTop(height);
  console.log(msg);

});

socket.on ('setBar', function (params) {

  setBarPercent(game, allUnits[params[0]], params[1]);

});

socket.on ('setMorale', function (params) {

  damageMorale(allUnits[params[0]].parent, params[1]);

});