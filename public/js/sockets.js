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

socket.on('turnChange',  function (user) {

  console.log(user);

});

socket.on('bottomSide', function () {

  endTurn();
  console.log('end turn');

});

socket.on('topSide', function () {

  waiting();

});
