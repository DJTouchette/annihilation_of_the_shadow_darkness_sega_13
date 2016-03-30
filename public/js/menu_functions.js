function mainMenu () {
  menu = game.add.image(0, 0, 'menu');
  menu.inputEnabled = true;
  menu.events.onInputDown.add(startGame, this);
  // window.socket.emit('startGame');
}

function victoryScreen() {
  mover.kill();
  winScreen = game.add.image(0, 0, 'victory');
  winScreen.inputEnabled = true;
  winScreen.events.onInputDown.add(restartGame, this);
}

function defeatScreen() {
  mover.kill();
  loseScreen = game.add.image(0, 0, 'defeat');
  loseScreen.inputEnabled = true;
  loseScreen.events.onInputDown.add(restartGame, this);
}

function startGame() {
  menu.destroy();
  makeUnitBar();
  title();
  createMoraleBars();

  for (var i = 0; i < allUnits.length; i++) {
    surroundings(allUnits[i]);
    allUnits[i].unit.tileCheck();
  }

  playerTurn(turn);
  stats(allUnits[0], startingMoraleBottom, startingMoraleUp);
  // window.socket.emit('startGame');
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  window.socket.emit('startGame');
  fullScreen = game.add.sprite(762, 22, 'full_screen');
  fullScreen.inputEnabled = true;
  fullScreen.scale.setTo(0.15, 0.15);
  fullScreen.events.onInputDown.add(fullScreenMode, this);


}

function restartGame() {
  window.location.reload(false);
}
