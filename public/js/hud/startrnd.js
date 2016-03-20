function loadBtn () {

  game.load.spritesheet('btn','assets/border/box.png');

}

function placeBtn () {

  var startBtn = game.add.sprite(905, 540, 'btn');
  startBtn.scale.setTo(1, 0.5);
  startBtn.inputEnabled = true;
  startBtn.input.useHandCursor = true;
  // starBtn.events.onInputOver.add(yourFunction, this);
  addText(startBtn);

}

function addText (startBtn) {

  // startBtn.events.onInputOver.add(changeColor(), this);
  var style = { font: "20px Arial", fill: "green" };
  var txt = game.add.text(923, 547, 'Start', style);

  function changeColor() {
    style = { font: "20px Arial", fill: "red" };
    txt = game.add.text(923, 547, 'Start', style);
  }


}
