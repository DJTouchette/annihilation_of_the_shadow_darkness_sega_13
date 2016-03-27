//The graphic to change the bar to represent the troop value
function setBarPercent(game, sprite, troopCount){
  if(troopCount <= 0) {
    setBarIndividual(game, 0, getGraph);
    sprite.loadTexture('grave');
    sprite.unit.dead = true;
  }
  newWidth = (troopCount / 100);
  console.log(newWidth);
  getGraph = sprite.getChildAt(0);
  setBarIndividual(game, newWidth, getGraph);
}

// // The graphics transition
function setBarIndividual(game, newWidth, getGraph){
  game.add.tween(getGraph).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
}

// Get original width / overall total morale
function getWidth(sprite) {
  const initialWidth = sprite.width;
  return initialWidth;
}
