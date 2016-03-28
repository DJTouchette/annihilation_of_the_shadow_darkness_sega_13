var socket = io();

socket.on('turnChange', function (currentPlayer, currentGroup) {

  endTurn();
  updateUnit = [];

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

  // turnSwitch = true;


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

socket.on ('user1', function () {

  endTurn();

});

socket.on ('user2', function () {

  turnSwitch = true;


});

socket.on ('groupIs', function (group) {

  if (group[0] === 'bottomside' && group[1] === 1) {

    click();

  } else if (group[0] === 'topside' && group[1] === 2 ) {

    click();

  } else if (group[0] === 'topside' && group[1] === 1 ) {

    endTurn();

  } else if (group[0] === 'bottomside' && group[1] === 2 ) {

    endTurn();

  }


});

socket.on('newTilePosition', function (tile) {

  // click();

});
