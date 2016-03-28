var socket = io();

socket.on('turnChange', function (currentPlayer, currentGroup) {

  endTurn();
  updateUnit = [];

});

socket.on('lockInput', function(currentGroup, currentPlayer) {
  if (currentPlayer === 1 && currentGroup === 'bottomside') {
    endBtn.inputEnabled = false;
    mover.inputEnabled = false;
  } else if (currentPlayer === 2 && currentGroup === 'topside') {
    endBit.inputEnabled = false;
    mover.inputEnabled = false;
  }
  turnSwitch = true;
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
  UnitArr.x = unit.x;
  UnitArr.y = unit.y;
  UnitArr.atk = unit.atk;
  UnitArr.def = unit.def;
  UnitArr.spd = unit.spd;
  UnitArr.troops = unit.troops;

});

socket.on('chat message', function(deliver){

  $('#messages').append($('<li>').text(deliver.join('')));
  var lastMessage = $('#messages');
  var height = lastMessage[0].scrollHeight;
  lastMessage.scrollTop(height);

});

socket.on ('setBar', function (params) {

  setBarPercent(game, allUnits[params[0]], params[1]);

});

socket.on ('setMorale', function (params) {

  damageMorale(allUnits[params[0]].parent, params[1]);

});

socket.on ('user1', function () {

  endTurn();

});

socket.on ('user2', function () {

//??

});

socket.on('groupNow', function(group){

  if (group[0] != currentGroup){

    socket.emit('switchIt');
    sideSwitch = false;
    turnSwitch = true;

  }

});

socket.on("turnIt", function () {

  turnSwitch = true;
  endTurn();

});