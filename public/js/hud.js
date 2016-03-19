
function hudPlayer (player, unit) {
  var horizontalB = game.add.sprite(800, 584.5, 'horizontal');
  var horizontalT = game.add.sprite(800, -10, 'horizontal');
  var bottomLeft = game.add.sprite(803, 565, 'bottomLeft');
  var bottomRight = game.add.sprite(968, 565, 'bottomRight');
  var topRight = game.add.sprite(965, -15.8, 'topRight');
  var topLeft = game.add.sprite(808, -17.8, 'topLeft');
  var verticalL = game.add.sprite(808, 20, 'vertical');
  var verticalR = game.add.sprite(985, 20, 'vertical');

  var title = game.add.sprite(814, 8, 'title');
  var style = { font: "20px Arial", fill: "#ffffff",  align: "center" };


  horizontalT.scale.setTo(3, 2);
  horizontalB.scale.setTo(3, 2);
  verticalL.scale.setTo(2, 10);
  verticalR.scale.setTo(2, 10);
  bottomLeft.scale.setTo(2);
  bottomRight.scale.setTo(2);
  topRight.scale.setTo(2);
  topLeft.scale.setTo(2);
  title.scale.setTo(0.67);

  var playerName = game.add.text(890, 12, player, style);
  // playerName.anchor.set(0.5);

  // player = game.add.text(900, 10, playerName, style);
  // unitTitle = game.add.text(900, 30);
  // unit = game.add.text(900, 50, unit, style);
}
