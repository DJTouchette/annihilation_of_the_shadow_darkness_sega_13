function loadBtn () {

  game.load.spritesheet('btn','assets/border/box.png');

}

function placeBtn () {

  var startBtn = game.add.sprite(905, 540, 'btn');
  startBtn.scale.setTo(1, 0.5);
  startBtn.inputEnabled = true;
  startBtn.input.useHandCursor = true;
  // Make button clickable add(this.function, this)
  startBtn.events.onInputDown.add(this.over, this);

  addText(startBtn);

}

function addText (startBtn) {

  var style = { font: "20px Indie", fill: "green" };
  var txt = game.add.text(923, 547, 'Start', style);

}

function click() {
  console.log('clicked');
}
