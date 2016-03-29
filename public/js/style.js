$(function () {

  $('.InputAddOn-item').on('click', function () {

    $('input').focus();
    socket.emit('chat message', $('input').val());
    $('input').val('');
    return false;

  });

  $('input').keypress(function (e) {

  if (e.which == 13) {

    $('.InputAddOn-item').click();
    return false;
    }

  });
  console.log('Ready');
});