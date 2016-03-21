// createBarIndividual will create a green bar on top each sprite
function createBarIndividual(game, army){ 

  graphics = game.add.graphics(0,0);
  graphics.beginFill(0x00FF00);
  graphics.drawRect(0, 0, 50, 10);
  // console.log("At 1st, width is: " + graphics.width);
  army.addChild(graphics);
}
// setBarPercent will create a new width based on Health deducted by damage
// e.g. Total moral = 100, damage = 10, new width = 100 - 10 = 90
function setBarPercent(game, army, newValue, initialWidth){
  if(newValue < 0) newValue = 0;
  if(newValue > 100) newValue = 100;
  newWidth = (newValue * initialWidth) / 100;
  // console.log("The new width: " + newWidth);
  
  getGraph = army.getChildAt(0);

  // call setBarIndividual
  setBarIndividual(game, newWidth, getGraph);
}

// The graphics transition
function setBarIndividual(game, newWidth, getGraph){
  // console.log("The graphics width is:" + getGraph.width);
  game.add.tween(getGraph).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
}

// Get original width / overall total morale
function getWidth(armySprite) {
  const initialWidth = armySprite.getChildAt(0).width;
  return initialWidth;
}