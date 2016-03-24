var socket = io();

$(function() {

$('body').on('click', function () {
    socket.emit('pop');
    socket.emit('turnChange');
});

socket.on('SOMEONE_POPPED', function () {
  $('h1').css('color', 'red');
  console.log('bang');
});

});

function changeShit () {
  $('h1').css('color', 'red');
}


socket.on('turnChange', function (msg) {

  endTurn();

});

socket.on('waiting', function () {

  var msg = waiting();

});

socket.on ('index', function (i) {

  console.log(allUnits[i]);

});

socket.on ('spriteMoved', function (xy) {

console.log(xy);

});
