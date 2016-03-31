var socket = io();

// socket.on('turnChange', function (currentPlayer, currentGroup) {

//   endTurn();
//   updateUnit = [];

// });

socket.on('lockInput', function(currentGroup, currentPlayer) {
  if (currentPlayer === 1 && currentGroup === 'bottomside') {
    // endBtn.inputEnabled = false;
    mover.inputEnabled = false;
  } else if (currentPlayer === 2 && currentGroup === 'topside') {
    // endBit.inputEnabled = false;
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

  // endTurn();
  // socket.emit('killBtn');
  mover.inputEnabled = true;
  mover.input.priorityID = 1;
  systemMsg(['Your turn!']);

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

  systemMsg(msg);
  socket.emit('damageDone', msg);

});

socket.on('troopsKilled', function (msg) {

  systemMsg(msg);

});

socket.on('miss', function (msg) {

  systemMsg(msg);

});

socket.on('readEm', function (rules) {

    systemMsg(rules[0]);
    systemMsg(rules[1]);
    systemMsg(rules[2]);
    systemMsg(rules[3]);
    systemMsg(rules[4]);

});


//Expects an array
function sendMsg(msg) {

  var lastMessage = $('#messages');
  var list = $('<li>');
  // list.css('color', '#cb4b16;');
  lastMessage.append(list.text(msg.join('')));

  var height = lastMessage[0].scrollHeight;
  lastMessage.scrollTop(height);

}

function systemMsg(msg) {

  var lastMessage = $('#messages');
  var list = $('<li>');
  list.css('color', '#cb4b16');
  lastMessage.append(list.text(msg.join('')));

  var height = lastMessage[0].scrollHeight;
  lastMessage.scrollTop(height);

}
