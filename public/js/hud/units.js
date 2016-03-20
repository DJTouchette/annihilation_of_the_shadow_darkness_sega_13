// Displays the unit frame
function unitFrame() {

  var leftCorner = game.add.sprite(830, 50, 'leftCorner');
  var rightCorner = game.add.sprite(962, 50, 'rightCorner');
  var bottomRight = game.add.sprite(967, 200, 'bottomRightCorner');
  var bottomLeft = game.add.sprite(830, 200, 'bottomLeftCorner');


}

// Populates units frame. Takes in [array] of units.
function displayUnits (unit) {

  var styleTitle = { font: "18px Arial", fill: "#ffffff" };
  var title = game.add.text(890, 60, 'Units', styleTitle);

  var styleUnit = { font: "15px Arial", fill: "#FFFB00" };

  var position = [90, 120, 150];
  for (var i = 0; i < unit.length; i++) {

    game.add.text(840, position[i], unit[i], styleUnit);
    game.add.text(970, position[i], '2', styleUnit);

  }

}

// Loads unit assets
function loadUnitFrame () {

  game.load.spritesheet('bottomLeftCorner','assets/border/bottom_left_corner_box.png');
  game.load.spritesheet('bottomRightCorner','assets/border/bottom_right_corner_box.png');
  game.load.spritesheet('leftCorner','assets/border/left_corner_box.png');
  game.load.spritesheet('rightCorner','assets/border/right_corner_box.png');

}
