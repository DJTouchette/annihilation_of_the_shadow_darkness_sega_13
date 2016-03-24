
// Loads all border assets

function loadBorder (border) {

  for (var i = 0; i < border.length; i++) {

      game.load.spritesheet(spritesBorder[i].position, spritesBorder[i].path);

  }


}




// Puts boder in place
function makeBorder () {

  var horizontalB = game.add.sprite(808, 584.5, 'horizontal');
  var horizontalT = game.add.sprite(810, -10, 'horizontal');
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
