
function hudPlayer (player, unit) {
  var horizontal = game.add.sprite(800, 584.5, 'horizontal');
  // var horizontalT = game.add.sprite(800, 0, 'horizontal');

  var title = game.add.sprite(814, 1, 'title');
  var style = { font: "20px Arial", fill: "#ffffff",  align: "center" };

  horizontal.scale.setTo(3, 2);
  title.scale.setTo(0.67);

  var playerName = game.add.text(890, 6, player, style);
  // playerName.anchor.set(0.5);

  // player = game.add.text(900, 10, playerName, style);
  // unitTitle = game.add.text(900, 30);
  // unit = game.add.text(900, 50, unit, style);
}
