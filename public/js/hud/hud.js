
function hudPlayer (player, unit) {

  makeBorder();
  unitFrame();
  displayUnits(unit);


  var title = game.add.sprite(814, 8, 'title');
  var style = { font: "20px Arial", fill: "#ffffff",  align: "center" };

  title.scale.setTo(0.67);

  var playerName = game.add.text(890, 12, player, style);
  // playerName.anchor.set(0.5);

  // player = game.add.text(900, 10, playerName, style);
  // unitTitle = game.add.text(900, 30);
  // unit = game.add.text(900, 50, unit, style);

}
