function loadBtn () {

  game.load.spritesheet('btn','assets/border/box.png');

}

function placeBtn (text, color) {

  var startBtn = game.add.sprite(905, 540, 'btn');
  startBtn.scale.setTo(1, 0.5);
  startBtn.inputEnabled = true;
  startBtn.input.useHandCursor = true;
  // Make button clickable add(this.function, this)
  startBtn.events.onInputDown.add(this.over, this);

  addText(startBtn, text, color);

}

function addText (startBtn, text, color) {

  var style = { font: "20px Indie", fill: color };
  var txt = game.add.text(923, 547, text, style);

}

function click() {
  console.log('clicked');
}
