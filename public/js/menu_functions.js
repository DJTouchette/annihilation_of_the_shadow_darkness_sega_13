function mainMenu () {
  menu = game.add.image(0, 0, 'menu');
  menu.inputEnabled = true;
  menu.events.onInputDown.add(startGame, this);
  window.socket.emit('startGame');
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
  createMoraleBars();
  window.socket.emit('startGame');
  for (var i = 0; i < allUnits.length; i++) {
    surroundings(allUnits[i]);
    allUnits[i].unit.tileCheck();
  }
  playerTurn(turn);
}

function restartGame() {
  window.location.reload(false);
}
