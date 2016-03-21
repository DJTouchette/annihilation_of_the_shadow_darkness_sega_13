
function makeHudPlayer (player, unit) {

  makeBorder();
  firstFrame(displayUnits(unit));

  var title = game.add.sprite(814, 8, 'title');
  var style = { font: "20px Indie", fill: "#A0A2A3",  align: "center" };

  title.scale.setTo(0.67);

  var playerName = game.add.text(890, 12, player, style);

}
