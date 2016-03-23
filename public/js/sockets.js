var socket = io();

$(function() {

$('body').on('click', function () {
    socket.emit('pop');
});

socket.on('SOMEONE_POPPED', function () {
  $('h1').css('color', 'red');
  console.log('bang');
});
// $('body').on('click', function () {
//     console.log('haaay');
// });

});

function changeShit () {
  $('h1').css('color', 'red');
}
