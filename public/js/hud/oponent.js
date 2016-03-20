//oponent frame
function openentFrame (oponent, units) {

  var leftCorner = game.add.sprite(830, 300, 'leftCorner');
  var rightCorner = game.add.sprite(962, 300, 'rightCorner');
  var bottomRight = game.add.sprite(967, 450, 'bottomRightCorner');
  var bottomLeft = game.add.sprite(830, 450, 'bottomLeftCorner');
  opponentText(oponent, units);
}

//populate opponets frame
function opponentText (oponent, units) {

  var styleTitle = { font: "18px Arial", fill: "#ffffff" };
  var title = game.add.text(890, 310, oponent, styleTitle);

  var styleUnit = { font: "15px Arial", fill: "#ffdb4d" };

  var position = [340, 370, 400];
  for (var i = 0; i < units.length; i++) {

    game.add.text(840, position[i], units[i], styleUnit);
    game.add.text(970, position[i], '2', styleUnit);

  }

}
