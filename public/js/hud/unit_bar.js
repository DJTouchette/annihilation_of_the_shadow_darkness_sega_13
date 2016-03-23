
function makeUnitBar (unit) {

  console.log('i ran');
  makeBorder();
  firstFrame(unitStats(unit));
  unitStats(unit);
  makeSecondFrame(terrain(unit));
  title();
  endTurn();
  // console.log("i ran");

}

function endTurn () {

  var endBtn = game.add.sprite(829, 550, 'end');
  endBtn.inputEnabled = true;
  endBtn.scale.setTo(0.9);
  endBtn.inputEnabled = true;
  endBtn.input.useHandCursor = true;
  // Make button clickable add(this.function, this)
  endBtn.events.onInputDown.add(this.click, this);
}

function title () {

  var title = game.add.sprite(814, 8, 'title');
  // var mainTitle = game.add.sprite(0,0, 'title');
  var style = { font: "20px Indie", fill: "#A0A2A3",  align: "center" };
  var stats = game.add.text(890, 15, 'Stats', style);
  title.scale.setTo(0.67);


}

function unitStats (unit) {
// debugger;
var styleTitle = { font: "18px Arial", fill: "#ffffff" };

if (unit.unit.constructor.name === 'Footman' || unit.unit.constructor.name === 'Horseman' || unit.unit.constructor.name === 'Armored' ) {

  game.add.text(868, 60, unit.unit.constructor.name , styleTitle);

} else if (unit.unit.constructor.name === 'Archer'){

  game.add.text(883, 60, unit.unit.constructor.name, styleTitle);

}

var styleUnit = { font: "15px Arial", fill: "#FFFB00" };

var position = [90, 120, 150, 180];

game.add.text(840, position[0], 'Morale', styleUnit);
game.add.text(963, position[0], unit.unit.armyMorale(), styleUnit);

game.add.text(840, position[1], 'Atk', styleUnit);
game.add.text(970, position[1], unit.unit.atk, styleUnit);

game.add.text(840, position[2], 'Def', styleUnit);
game.add.text(970, position[2], unit.unit.def, styleUnit);

game.add.text(840, position[3], 'Spd', styleUnit);
game.add.text(975, position[3], unit.unit.spd, styleUnit);

}

function terrain (unit) {

  unit.unit.moraleBuff();
  var styleTitle = { font: "18px Indie", fill: "#ffffff" };
  var styleHeader = { font: "18px Indie", fill: "yellow" };

  var header = game.add.sprite(814, 240, 'title');
  header.scale.setTo(0.67);

  var headerTxt = game.add.text(865, 248, 'Stat Changes', styleHeader);

  // var title = game.add.text(890, 310, 'oponent', styleTitle);

  var styleUnit = { font: "15px Indie", fill: "#FFFB00" };

  var position = [340, 370, 400];



  game.add.text(840, position[0], 'Grass', styleUnit);
  game.add.text(935, position[0], unit.unit.tile, styleUnit);

  // Need a morale function that decides on what stat is boosted.
  game.add.text(840, position[1], 'Morale', styleUnit);
  game.add.text(935, position[1],['Def', unit.unit.def - unit.unit.ogDef].join('   '), styleUnit );

  // Other stat or marale
  game.add.text(935, position[2],['Spd', unit.unit.spd - unit.unit.ogSpd].join('  '), styleUnit );

}

function click() {

  console.log('clicked');
  turnSwitch = true;

}
