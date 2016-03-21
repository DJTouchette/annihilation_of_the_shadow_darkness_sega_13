function createBarIndividual(game, army){ 

  graphics = game.add.graphics(0,0);
  graphics.beginFill(0x00FF00);
  graphics.drawRect(0, 0, 50, 10);
  console.log("At 1st, width is: " + graphics.width);
  army.addChild(graphics);
}

function setBarPercent(game, army, newValue){
  if(newValue < 0) newValue = 0;
  if(newValue > 100) newValue = 100;
  //TODO: DO NOT HARD CODE - get the individual width
  newWidth = (newValue * 50) / 100;
  console.log("The new width: " + newWidth);
  
  getGraph = army.getChildAt(0);
  setBarIndividual(game, newWidth, getGraph);
}

function setBarIndividual(game, newWidth, getGraph){
  console.log("The graphics width is:" + getGraph.width);
  game.add.tween(getGraph).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
}