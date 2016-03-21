// Makes unit bar, Takes in unit object. Pattern ex (var unit = {type: 'Horseman', 'Morale': 3, 'Atk': 5, 'Def': 2, 'Spd': 6};).
function makeUnitBar (unit) {

  makeBorder();
  firstFrame(unitStats(unit));
  unitStats(unit);
  makeSecondFrame(terrain(unit));
  placeBtn('End', 'orange');
  title();

}

function title () {

  var title = game.add.sprite(814, 8, 'title');
  var style = { font: "20px Indie", fill: "#A0A2A3",  align: "center" };
  var stats = game.add.text(890, 15, 'Stats', style);
  title.scale.setTo(0.67);


}

function unitStats (unit) {

var styleTitle = { font: "18px Arial", fill: "#ffffff" };

if (unit.type === 'Swordman' || unit.type === 'Horseman' ) {

  game.add.text(868, 60, unit.type, styleTitle);

} else if (unit.type === 'Archer'){

  game.add.text(883, 60, unit.type, styleTitle);

}

var styleUnit = { font: "15px Arial", fill: "#FFFB00" };

game.add.text(840, 90, unit[0], styleUnit);
game.add.text(970, 90, unit.atk, styleUnit);

var position = [90, 120, 150, 180];
var stats = ['Morale', 'Atk', 'Def', 'Spd' ];

  for (var i = 0; i < 5; i++) {

    game.add.text(840, position[i], stats[i], styleUnit);
    game.add.text(970, position[i], unit[stats[i]], styleUnit);

  }
}

function terrain (unit) {

  var styleTitle = { font: "18px Indie", fill: "#ffffff" };
  var styleHeader = { font: "18px Indie", fill: "yellow" };

  var header = game.add.sprite(814, 240, 'title');
  header.scale.setTo(0.67);

  var headerTxt = game.add.text(865, 248, 'Stat Changes', styleHeader);

  // var title = game.add.text(890, 310, 'oponent', styleTitle);

  var styleUnit = { font: "15px Indie", fill: "#FFFB00" };

  var position = [340, 370, 400];

  game.add.text(840, position[0], unit.tile.terrain, styleUnit);
  game.add.text(935, position[0], unit.tile.buff.join('   '), styleUnit);

  // Need a morale function that decides on what stat is boosted.
  game.add.text(840, position[1], 'Morale', styleUnit);
  game.add.text(935, position[1],['Def', '-1'].join('   '), styleUnit );

  // Other stat or marale
  game.add.text(935, position[2],['Spd', '+4'].join('  '), styleUnit );

}
