// Takes in array of units
function units(unit) {

  var leftCorner = game.add.sprite(830, 50, 'leftCorner');
  var rightCorner = game.add.sprite(962, 50, 'rightCorner');
  var bottomRight = game.add.sprite(967, 200, 'bottomRightCorner');
  var bottomLeft = game.add.sprite(830, 200, 'bottomLeftCorner');





}

function loadUnitFrame () {
  game.load.spritesheet('bottomLeftCorner','assets/border/bottom_left_corner_box.png');
  game.load.spritesheet('bottomRightCorner','assets/border/bottom_right_corner_box.png');
  game.load.spritesheet('leftCorner','assets/border/left_corner_box.png');
  game.load.spritesheet('rightCorner','assets/border/right_corner_box.png');
}
