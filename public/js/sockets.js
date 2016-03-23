var socket = io();

$(function() {

$('body').on('click', function () {
    socket.emit('pop');
});

$('body').on('click', function () {
    console.log('haaay');
});

});

socket.emit('mouse_position', {mx : x, my : y});

var paper = new Raphael(canvas, 200, 200);
var cur = paper.circle(0, 0, 3);
cur.animate({
    cx : data.mx,
    cy : data.my
}, 1, 'linear');
