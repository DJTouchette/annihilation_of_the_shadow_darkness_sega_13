function loadBtn () {

  game.load.spritesheet('btn','assets/border/box.png');

}

function startTurn () {
  var startBtn = game.add.sprite(823, 550, 'start');
  startBtn.inputEnabled = true;
  startBtn.scale.setTo(0.9);
  startBtn.inputEnabled = true;
  startBtn.input.useHandCursor = true;
  // Make button clickable add(this.function, this)
  startBtn.events.onInputDown.add(this.click, this);

}
