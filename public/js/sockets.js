var socket = io();


$(function() {

// $('body').on('click', function () {
//     socket.emit('pop');
//     socket.emit('turnChange');
// });

socket.on('SOMEONE_POPPED', function () {
  $('h1').css('color', 'red');
  console.log('bang');
});

});

function changeShit () {
  $('h1').css('color', 'red');
}


socket.on('turnChange', function (currentPlayer, currentGroup) {
    updateUnit = [];
    console.log('turnChange started by User ' + currentPlayer)
    console.log('Current Group is :' + currentGroup)
    if (currentPlayer === 1 && currentGroup === 'bottomside'){
      disableBtn();
    }else if (currentPlayer === 1 && currentGroup === 'topside'){
      enableBtn();
    }
    else if(currentPlayer === 2 && currentGroup === 'topside'){
      disableBtn();
    }
    else if (currentPlayer === 2 && currentGroup === 'bottomside'){
      enableBtn();
    }
});

socket.on('waiting', function () {

  var msg = waiting();

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