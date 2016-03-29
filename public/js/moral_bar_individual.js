//The graphic to change the bar to represent the troop value
function setBarPercent(game, sprite, troopCount){
  if(troopCount <= 0) {
    sprite.unit.troops = 0;
    sprite.removeChildAt(0);
    sprite.unit.dead = true;
    game.add.sprite(sprite.x, sprite.y, 'grave');
    sprite.kill();
  } else {
    newWidth = (troopCount / 100);
    getGraph = sprite.getChildAt(0);
    setBarIndividual(game, newWidth, getGraph);
    }
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
