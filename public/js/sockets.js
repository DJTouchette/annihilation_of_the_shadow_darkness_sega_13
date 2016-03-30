var socket = io();

// socket.on('turnChange', function (currentPlayer, currentGroup) {

//   endTurn();
//   updateUnit = [];

// });

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
  // socket.emit('defeat');

});

socket.on('lose', function(){

  defeatScreen();
  // socket.emit('victory');

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

  sendMsg(deliver);

});

socket.on ('setBar', function (params) {

  setBarPercent(game, allUnits[params[0]], params[1]);

});

socket.on ('setMorale', function (params) {

  damageMorale(allUnits[params[0]].parent, params[1]);
  allUnits[params[0]].animations.play('attack');

});

socket.on ('user1', function () {
//supposed to do nil

});

socket.on ('user2', function () {
  socket.emit('switchIt');

});

socket.on ('makeBtn', function(){

  endTurn();
  socket.emit('killBtn');
  mover.inputEnabled = true;
  mover.input.priorityID = 1;

});

socket.on ('btnDestroyed', function () {

  endBtn.kill();

});

socket.on('groupNow', function(group, user){


  if (group !== currentGroup){

    socket.emit('switchIt');
    endBtn.inputEnabled = false;
    console.log('endBtn DIIIIEEEEE');
    endBtn.kill();
    mover.inputEnabled = false;
  }
});

socket.on("turnIt", function () {
  console.log('Turnt');

  turnSwitch = true;
  // endTurn();

});

socket.on('btnDestroyed', function(){

    endBtn.kill();

  // console.log(endBtn);
});

socket.on('systemMsg', function (msg) {

  sendMsg(msg);
  socket.emit('damageDone', msg);

});

socket.on('troopsKilled', function (msg) {

  sendMsg(msg);

});

socket.on('miss', function (msg) {

  sendMsg(msg);

});

socket.on('readEm', function (rules) {

    sendMsg(rules[0]);
    sendMsg(rules[1]);
    sendMsg(rules[2]);
    sendMsg(rules[3]);
    sendMsg(rules[4]);

});

//Expects an array
function sendMsg(msg) {

  $('#messages').append($('<li>').text(msg.join('')));
  var lastMessage = $('#messages');
  var height = lastMessage[0].scrollHeight;
  lastMessage.scrollTop(height);

}
