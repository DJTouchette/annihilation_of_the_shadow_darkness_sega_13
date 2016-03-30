function makeUnitBar () {

  makeBorder();
  // firstFrame(unitStats(unit));
  // unitStats(unit);
  // makeSecondFrame(terrain(unit, moraleUp, moraleBottom));
  title();

}

function stats (unit, moraleUp, moraleBottom) {

  firstFrame(unitStats(unit));
  unitStats(unit);
  makeSecondFrame(terrain(unit, moraleUp, moraleBottom));


}


function endTurn () {
  console.log('endTurn ran!');
  endBtn = game.add.sprite(829, 550, 'end');
  endBtn.scale.setTo(0.9);
  endBtn.inputEnabled = true;
  endBtn.input.useHandCursor = true;
  endBtn.events.onInputDown.add(click);
  endBtn.events.onInputOver.add(over, this);
  endBtn.events.onInputOut.add(out, this);


}

function waiting () {
    var msg = game.add.sprite(829, 550, 'title');
    return msg;
}

function title () {
  var title = game.add.sprite(814, 8, 'title');
  // var mainTitle = game.add.sprite(0,0, 'title');
  var style = { font: "20px Indie", fill: "#A0A2A3",  align: "center" };
  var stats = game.add.text(890, 15, 'Stats', style);
  title.scale.setTo(0.67);
}

function unitStats (unit) {

  var unitNameTxt = '';

  if (menuAtk !== undefined) {

  menuAtk.val.setText(unit.unit.atk);
  menuMorale.val.setText(unit.unit.armyMorale());
  menuDef.val.setText(unit.unit.def);
  menuSpd.val.setText(unit.unit.spd);

  if (unit.unit.constructor.name === 'Footman') {

      unitNameTxt = 'Footman';

    } else if (unit.unit.constructor.name === 'Archer'){

      unitNameTxt = 'Archer';

    } else if (unit.unit.constructor.name === 'Armored') {

      unitNameTxt = 'Armored';

    } else if (unit.unit.constructor.name === 'Horseman') {

      unitNameTxt = 'Horseman';

  }

  unitName.setText(unitNameTxt);
  return false;

}

// console.log("made it!!!!!!");

  var styleTitle = { font: "18px Arial", fill: "#ffffff" };
  if (unit.unit.constructor.name === 'Footman' || unit.unit.constructor.name === 'Horseman' || unit.unit.constructor.name === 'Armored' ) {
    unitName = game.add.text(868, 60, unit.unit.constructor.name , styleTitle);
  } else if (unit.unit.constructor.name === 'Archer'){
    unitName = game.add.text(883, 60, unit.unit.constructor.name, styleTitle);
  }

  var styleUnit = { font: "15px Arial", fill: "#FFFB00" };
  var position = [90, 120, 150, 180];


  menuMorale = game.add.text(840, position[0], 'Morale', styleUnit);
  menuMorale.val = game.add.text(963, position[0], unit.unit.armyMorale(), styleUnit);

  menuAtk = game.add.text(840, position[1], 'Atk', styleUnit);
  menuAtk.val = game.add.text(970, position[1], unit.unit.atk, styleUnit);

  menuDef = game.add.text(840, position[2], 'Def', styleUnit);
  menuDef.val = game.add.text(970, position[2], unit.unit.def, styleUnit);

  menuSpd = game.add.text(840, position[3], 'Spd', styleUnit);
  menuSpd.val = game.add.text(975, position[3], unit.unit.spd, styleUnit);
// console.log(menuAtk);
}

function terrain (unit,  moraleUp, moraleBottom) {

  unit.unit.moraleBuff();
  moraleUp = moraleUp.toFixed(2);
  moraleBottom = moraleBottom.toFixed(2);

  if (menuChangeGrass !== undefined) {

  menuChangeGrass.val.setText(unit.unit.tile);
  menuChangeMorale.val.setText(['Def', unit.unit.def - unit.unit.ogDef].join('   '));
  menuChangeRm.val.setText(moraleUp);
  menuChangeBm.val.setText(moraleBottom);

  return false;
  }

  var styleTitle = { font: "18px Indie", fill: "#ffffff" };
  var styleHeader = { font: "18px Indie", fill: "yellow" };
  var header = game.add.sprite(814, 240, 'title');
  header.scale.setTo(0.67);
  var headerTxt = game.add.text(865, 248, 'Stat Changes', styleHeader);
  var styleUnit = { font: "15px Indie", fill: "#FFFB00" };
  var position = [340, 370, 400, 430];

  menuChangeGrass = game.add.text(840, position[0], 'Spd', styleUnit);
  menuChangeGrass.val = game.add.text(935, position[0], unit.unit.tile, styleUnit);

  // Need a morale function that decides on what stat is boosted.
  menuChangeMorale = game.add.text(840, position[1], 'Morale', styleUnit);
  menuChangeMorale.val = game.add.text(935, position[1],['Def', unit.unit.def - unit.unit.ogDef].join('   '), styleUnit );

  // Other stat or marale
  // game.add.text(935, position[2],['Spd', unit.unit.spd - unit.unit.ogSpd].join('  '), styleUnit );
  menuChangeRm = game.add.text(840, position[2], 'Red Morale', styleUnit);
  menuChangeRm.val = game.add.text(935, position[2], moraleUp, styleUnit);

  menuChangeBm = game.add.text(840, position[3], 'Blue Morale', styleUnit);
  menuChangeBm.val = game.add.text(935, position[3], moraleBottom, styleUnit);
}

function over (endBtn) {
  endBtn.loadTexture('endGlow');
}

function out (endBtn) {

  endBtn.loadTexture('end');

}

function click() {

  turnSwitch = true;
  window.socket.emit('flickTheSwitch');
  
}
