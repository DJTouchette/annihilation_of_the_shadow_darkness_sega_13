
function hudPlayer (player, unit) {

  makeBorder();
  unitFrame();
  displayUnits(unit);


  var title = game.add.sprite(814, 8, 'title');
  var style = { font: "20px Arial", fill: "#ffffff",  align: "center" };

  title.scale.setTo(0.67);

  var playerName = game.add.text(890, 12, player, style);

}
