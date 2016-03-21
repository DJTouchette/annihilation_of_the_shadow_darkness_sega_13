
// Loads all border assets
function loadBorder () {

  game.load.spritesheet('horizontal','assets/border/horizontal.png');
  game.load.spritesheet('bottomLeft','assets/border/bottom_left.png');
  game.load.spritesheet('bottomRight','assets/border/bottom_right.png');
  game.load.spritesheet('topRight','assets/border/top_right.png');
  game.load.spritesheet('topLeft','assets/border/top_left.png');
  game.load.spritesheet('vertical','assets/border/vertical.png');
  game.load.spritesheet('background', 'assets/border/paper.png');
  game.load.spritesheet('box', 'assets/border/box.png');

}



// Puts boder in place
function makeBorder () {

  var horizontalB = game.add.sprite(800, 584.5, 'horizontal');
  var horizontalT = game.add.sprite(800, -10, 'horizontal');
  var bottomLeft = game.add.sprite(803, 565, 'bottomLeft');
  var bottomRight = game.add.sprite(968, 565, 'bottomRight');
  var topRight = game.add.sprite(965, -15.8, 'topRight');
  var topLeft = game.add.sprite(808, -17.8, 'topLeft');
  var verticalL = game.add.sprite(808, 20, 'vertical');
  var verticalR = game.add.sprite(985, 20, 'vertical');
  var background = game.add.sprite(825, 8, 'background');

  horizontalT.scale.setTo(3, 2);
  horizontalB.scale.setTo(3, 2);
  verticalL.scale.setTo(2, 10);
  verticalR.scale.setTo(2, 10);
  bottomLeft.scale.setTo(2);
  bottomRight.scale.setTo(2);
  background.scale.setTo(0.325, 1.14);
  topRight.scale.setTo(2);
  topLeft.scale.setTo(2);

}
