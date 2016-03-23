// createBarIndividual will create a green bar on top each sprite
// function createBarIndividual(game, army){ 

//   graphics = game.add.graphics(0,0);
//   graphics.beginFill(0x00FF00);
//   graphics.drawRect(0, 0, 50, 10);
//   // console.log("At 1st, width is: " + graphics.width);
//   army.addChild(graphics);
// }
// setBarPercent will create a new width based on Health deducted by damage
// e.g. Total moral = 100, damage = 10, new width = 100 - 10 = 90
function setBarPercent(game, army, troopCount){
  if(troopCount <= 0) {
    setBarIndividual(game, 0, getGraph);
    // army.loadTexture('grave');
    // army.anchor.setTo(0.05, 0.2);
    army.unit.dead = true;
  }
  newWidth = (troopCount / 100);
  getGraph = army.getChildAt(0);
  setBarIndividual(game, newWidth, getGraph);
}

// // The graphics transition
function setBarIndividual(game, newWidth, getGraph){
  // console.log("The graphics width is:" + getGraph.width);
  game.add.tween(getGraph).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
}

// Get original width / overall total morale
function getWidth(armySprite) {
  const initialWidth = armySprite.getChildAt(0).width;
  return initialWidth;
}