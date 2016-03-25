//VARIABLES START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var game = new Phaser.Game(1000, 600, Phaser.AUTO, "game_div", { preload: preload, mainMenu: mainMenu, create: create, update: update, render: render });

var map;
var tileGroup;
var music;
var allUnits = [];
var mover;
var unit;
var turnSwitch;
var turn = 0;
var limitX;
var limitY;
var menu;
var targetUnit;
var canAttack;
var unitColliding;
var specialTile;
var inGrass;
var rangeTile;
var endGame;
var redWins;
var blueWins;
var spritesBorder = [{position: 'horizontal', path: 'assets/border/horizontal.png'}, {position: 'bottomLeft', path: 'assets/border/bottom_left.png'},
 {position: 'bottomRight', path: 'assets/border/bottom_right.png'},
 {position: 'topRight', path: 'assets/border/top_right.png'},
 {position: 'topLeft', path: 'assets/border/top_left.png'},
 {position: 'vertical', path: 'assets/border/vertical.png'},
 {position: 'background', path: 'assets/border/paper.png'},
 {position: 'box', path: 'assets/border/box.png'},
 {position: 'start', path: 'assets/start_turn.png'},
 {position: 'end', path: 'assets/end-turn.png'},
 {position: 'endGlow', path: 'assets/End-glow.png'}
 ];

var hpBarTop;
var barConfigTop = {
  width: 100,
  height: 30,
  x: 60,
  y: 20,
  bg: {
    color: '#0047b3'
    },
  bar: {
    color: '#ff3300'
  },
};

//***
// starting morale is overall morale (100) divided by 2
var startingMoraleBottom = 50; //should create starting morale for each group
var startingMoraleUp = 50;
var previousMoraleUp = 0;
var previousMoraleBottom = 0;
var changeMoraleUp = 0;
var changeMoraleBottom = 0;

//VARIABLES END/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PRELOAD START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {
//Map///////////////////////////////////////////////////
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('menu', 'assets/background_image.png');
  game.load.image('victory', 'assets/victory.png');
  game.load.image('defeat', 'assets/defeat.png');
////////////////////////////////////////////////////////
//Units///////////////////////////////////////////////////
  game.load.atlasJSONHash('soldier', 'assets/units/soldier.png', 'assets/units/soldier.json');
  game.load.atlasJSONHash('camus', 'assets/units/camus.png', 'assets/units/camus.json');
  game.load.atlasJSONHash('cavalry', 'assets/units/cavalry.png', 'assets/units/cavalry.json');
//////////////////////////////////////////////////////////
//Tiles///////////////////////////////////////////////////

  game.load.image('wall', 'assets/wall.png');
  game.load.spritesheet('movetile', 'assets/movetile.png', 48, 48);
  game.load.image('move', 'assets/move.png');
  game.load.image('cantmove', 'assets/cantmove.png');
//////////////////////////////////////////////////////////

//Units///////////////////////////////////////////////////
  game.load.atlasJSONHash('soldier', 'assets/units/soldier.png', 'assets/units/soldier.json');
  game.load.atlasJSONHash('camus', 'assets/units/camus.png', 'assets/units/camus.json');
  game.load.atlasJSONHash('cavalry', 'assets/units/cavalry.png', 'assets/units/cavalry.json');
  game.load.spritesheet('grave', 'assets/units/grave.png', 46, 46);
//////////////////////////////////////////////////////////


//Music///////////////////////////////////////////////////
  game.load.audio('battle', 'assets/battle.mp3');
//////////////////////////////////////////////////////////
//Menu///////////////////////////////////////////////////
  game.load.spritesheet('title', 'assets/title.png');
  // Loads all border assets (/public/js/hud/border.js)
  loadBorder(spritesBorder);
  // Loads Unit frame assets (/public/js/hud/units.js)
  loadUnitFrame();
  //Loads start round btn (/public/js/hud/startrnd.js)
  loadBtn();
//////////////////////////////////////////////////////////
//PRELOAD END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


//CREATE START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create() {
  //Variables
  var graphics;

// MUSIC START////////////////////////////////////
  // music = game.add.audio('battle');
  // music.play();
// MUSIC END//////////////////////////////////////
//MAP START///////////////////////////////////////
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');
  background = map.createLayer('Tile Layer 1');
  background.resizeWorld();
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollisionBetween(13, 27, true, 'collision');
  game.physics.arcade.enable(map, 'collision');
  tileGroup = game.add.group();
  specialTile = game.add.group();
  rangeTile = game.add.group();
  map.createFromTiles([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], null, 'wall', collisionLayer, tileGroup);
  map.createFromTiles([1, 2, 4, 5, 7], null, 'wall', backgroundOL, specialTile);
  map.createFromTiles([8], null, 'cantmove', backgroundOL, rangeTile);
  game.physics.arcade.enable(tileGroup);
  mover = game.add.tileSprite(20, 20, 48, 48, 'movetile', 1);
  mover.animations.add('redden', [0, 1], 3, false);
  mover.inputEnabled = true;
  mover.input.enableDrag(true);
  mover.input.enableSnap(48, 48, true, true);
  // mover.events.onDragStart.add(unit.unit.tileCheck, unit.unit);
  mover.events.onDragStop.add(movePlayer, this);
  // mover.events.onDragStop.add(unit.unit.moraleBuff, unit.unit);
// //MAP END////////////////////////////////////////
//OTHER SPRITES START///////////////////////////
  bottomSide = game.add.group();
  bottomSide.name = 'bottomside';
  topSide = game.add.group();
  topSide.name = 'topside';

  createMoraleBars();

//OTHER SPRITES END////////////////////////////
//Call Create Functions HERE//////////////////
mainMenu();
createSide(144, 528, bottomSide, 'soldier', 4);

createSide(144, 48, topSide, 'camus', 10);
sortUnits();
playerTurn(turn);

//Create Functions CALLED////////////////////

//CREATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//UPDATE START//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(endBtn){
  if (turnSwitch) {
    // mover.kill();
    allUnits[turn].unit.tileCheck();
    allUnits[turn].unit.moraleBuff();
    turnSwitch = false;
    if (turn < 19) {
      turn += 1;
    } else if (turn === 19) {
      turn = 0;
    }
    playerTurn(turn);
  }

  // switch (endGame) {
  //   case "red":
  //     if (allUnits[turn].parent.name === 'topside') {
  //       victoryScreen();
  //       window.socket.emit('defeat');
  //     } else {
  //       defeatScreen();
  //       window.socket.emit('victory');
  //     }
  //     break;
  //   case "blue":
  //     if (allUnits[turn].parent.name === 'bottomside') {
  //       victorScreen();
  //       window.socket.emit('defeat');
  //     } else {
  //       defeatScreen();
  //       window.socket.emit('victory');
  //     }
  //   break;
    
  // }
  if (blueWins && allUnits[turn].parent.name === 'topside') {
    victoryScreen();
    window.socket.emit('defeat');
  }
  if (redWins && allUnits[turn].parent.name === 'bottomside') {
    victoryScreen();
    window.socket.emit('defeat');
  }
//UPDATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//RENDER START//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function render () {
  game.debug.text('Tile X: ' + collisionLayer.getTileX(game.input.activePointer.worldX), 48, 69, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + collisionLayer.getTileY(game.input.activePointer.worldY), 48, 48, 'rgb(0,0,0)');
//RENDER END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//FUNCTIONS///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//Create Sides//////////////////////////////////////////////////////

function createSide(x, y, group, sprite, frame_pos) {
  for (var i = 0; i < 4; i ++) {
    soldier = group.create((144 + x) + (48 * i), y, sprite);
    soldier.unit = new Footman();
    soldier.unit.dead = false;
    soldier.anchor.setTo(-0.25, 0);
    soldier.inputEnabled = true;
    soldier.frame = frame_pos;
    createTroopBar(soldier);
    allUnits.push(soldier);
  }
  for (var j = 0; j < 2; j++) {
    archer = group.create((x + 96) + (j * 240), y, sprite);
    archer.unit = new Archer();
    archer.unit.dead = false;
    archer.anchor.setTo(-0.25, 0);
    archer.inputEnabled = true;
    archer.frame = frame_pos;
    createTroopBar(archer);
    allUnits.push(archer);
  }
  for (var f = 0; f < 2; f++) {
    armored = group.create((48 + x) + (f * 336), y, sprite);
    armored.unit = new Armored();
    armored.unit.dead = false;
    armored.anchor.setTo(-0.25, 0);
    armored.inputEnabled = true;
    armored.frame = frame_pos;
    createTroopBar(armored);
    allUnits.push(armored);
  }
  for (var e = 0; e < 2; e++) {
    horseman = group.create(x + (e * 432), y, sprite);
    horseman.unit = new Horseman();
    horseman.unit.dead = false;
    horseman.anchor.setTo(-0.25, 0);
    horseman.inputEnabled = true;
    horseman.frame = frame_pos;
    createTroopBar(horseman);
    allUnits.push(horseman);
  }
}

function setSprite(sprite){
  sprite.anchor.setTo(-0.25, 0);
  sprite.inputEnabled = true;
  sprite.frame = frame_pos;
  createTroopBar(sprite);
}

function sortUnits(){
  allUnits.sort(function compare (a, b) {
    return b.unit.spd - a.unit.spd;
  });

  for (var i = 0; i < allUnits.length; i ++) {

    allUnits[i].unit.index = i;

  }

}
//Morale Bar//////////////////////////////////////////////////////
function createMoraleBars(){
  hpBarTop = new HealthBar(this.game, barConfigTop);
  hpBarTop.setFixedToCamera(true);
  // Set the push and pull morale bar in 50% (start from the middle)
  hpBarTop.setPercent(50);
  // hpBarTop.bringToTop();brings to top but erases the menu
  // hpBarBottom = new HealthBar(this.game, barConfigBottom);
  // hpBarBottom.setFixedToCamera(true);
}

function createTroopBar(sprite){
  graphics = this.game.add.graphics(1, -11);
  graphics.beginFill(0X00FF00);
  graphics.drawRect(0, 0, 46, 10);
  sprite.addChild(graphics);
}

// ***
// accept group bottomside or topside
function damageMorale(group, enemyTroops){
  // group argument is the attacking group
  var moralValue = 50;
  console.log("Troops destroyed:", 100 - enemyTroops);
  var totalUnit = group.children.length;
  var unitLife = moralValue / totalUnit; //each unit contributes 5 morale, so total 50 morale for each army
  // more enemyTroops means more morale change
  var moraleCalculation = ((100 - enemyTroops) / 100) * unitLife;
  console.log("Enemy troops morale change:", moraleCalculation);

  if(group.name == "bottomside"){
    // bottomside attacks topside
    // change bar, bottom side should increase
    console.log("Before attack, up morale is:", startingMoraleUp);
    // previousMoraleUp = moraleCalculation; // Previous morale after attacking up/red
    changeMoraleUp = troopMoraleCalc(enemyTroops, moraleCalculation, changeMoraleUp, "bottomside");

    console.log("Change morale is:", changeMoraleUp);
    startingMoraleUp -= changeMoraleUp;
    console.log("After attack, Up becomes", startingMoraleUp);
    startingMoraleBottom += changeMoraleUp;
    console.log("Bottom Becomes", startingMoraleBottom);
    if(startingMoraleBottom >= 100){
      startingMoraleBottom = 100;
      console.log("Blue wins");
      gameEnd = true;
      blueWins = true;
      redWins = false;
    }
    hpBarTop.setPercent(startingMoraleUp);
    console.log("after bottom attacked, up morale now:", startingMoraleUp);
  }
  else if(group.name == "topside"){
    // topside attacks bottom
    // change bar, up side should increase
    console.log("Before attack, bottom morale is:", startingMoraleBottom);
    // previousMoraleBottom = moraleCalculation; // Previous morale after attacking bottom/blue
    changeMoraleBottom = troopMoraleCalc(enemyTroops, moraleCalculation, changeMoraleBottom, "topside");

    console.log("Change morale is:", changeMoraleBottom);
    startingMoraleBottom -= changeMoraleBottom;
    console.log("After attack, Bottom becomes", startingMoraleBottom);
    startingMoraleUp += changeMoraleBottom;
    console.log("Up becomes", startingMoraleUp);
    if(startingMoraleUp >= 100){
      startingMoraleUp = 100;
      console.log("Red wins");
      gameEnd = true;
      redWins = true;
      blueWins = false;
    }
    hpBarTop.setPercent(startingMoraleUp);
    console.log("after up attacked, bottom morale now:", startingMoraleBottom);
  }
}

// ***
// Troop checker if troop is 0,
//   then change morale is 5 which is equal to 1 sprite
//   50 morale = 10 units
// If changeMorale is 5, then 1 sprite was previously killed
function troopMoraleCalc(enemyTroops, troopMoralDestroyed, changeMorale, group){
  console.log("Change morale up before", changeMorale);
  // startingMoraleUp to change

  if(changeMorale === 0 || changeMorale >= 5){
    // make morale up equal to morale calculation
    changeMorale = troopMoralDestroyed;

    if(group === "bottomside") previousMoraleUp = troopMoralDestroyed;
    if(group === "topside") previousMoraleBottom = troopMoralDestroyed;

    // previousMorale = troopMoralDestroyed;
    console.log("enter 1");
  }
  else{
    // console.log("Previous morale", previousMorale);
    // save the previous morale
    var before = troopMoralDestroyed;
    if(group === "bottomside"){
      console.log("enter 3 bottomside");
      troopMoralDestroyed -= previousMoraleUp;
      previousMoraleUp = before;
    }

    if(group === "topside"){
      console.log("enter 3 topside");
      troopMoralDestroyed -= previousMoraleBottom;
      previousMoraleBottom = before;
    }

    changeMorale = Math.abs(troopMoralDestroyed);
    console.log("enter 3 ends");
  }
  // bonus morale if kill a unit????
  if(enemyTroops === 0) {
    changeMorale += 5;
    console.log("enter 2");
  }
  return changeMorale;
}

///Move Functions//////////////////////////////////////////////////////

function playerTurn (i) {

    unit = allUnits[i];
    if (unit.unit.dead === true){
      turnSwitch = true;
    }
    makeUnitBar(unit);
    mover.x = unit.x;
    mover.y = unit.y;
    // mover.anchor.setTo(0.5, 0.5);
    limitX = unit.x;
    limitY = unit.y;
    // window.socket.emit('spriteMoved', unit.unit);

}

function playerTurnComputer (i) {

    console.log('Units loooog: ' + allUnits[i]);

}



function movePlayer(tile, sprite) {
  unitCollision(tile);
  // unit.unit.rangeTileCheck();
  if ( (Math.abs(Math.floor(limitX / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(limitY / 48) - background.getTileY(tile.y)) <= 20 ) && !tileCollision(tile) && (unitColliding === false)) {
    unit.x = tile.x;
    unit.y = tile.y;
    unit.unit.x = unit.x;
    unit.unit.y = unit.y;
    window.socket.emit('spriteMoved', unit.unit);
    console.log(unit);
    targetUnit = false;
  } else {
    if ((unitColliding === true) && (Math.abs(Math.floor(unit.x / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(unit.y / 48) - background.getTileY(tile.y)) <= unit.unit.rng )) {
      if (targetUnit.parent.name !== unit.parent.name) {
        canAttack = true;
        unit.unit.attack(targetUnit.unit);
        setBarPercent(game, targetUnit, targetUnit.unit.troops);
        damageMorale(unit.parent, targetUnit.unit.troops);
        window.socket.emit('moraleChange', [unit.unit.index, targetUnit.unit.troops]  );
        window.socket.emit('barChange', [targetUnit.unit.index, targetUnit.unit.troops]);
        console.log('target unit :', targetUnit);
        console.log('target troops:', targetUnit.unit.troops)
        damageMorale(unit.parent, targetUnit.unit.troops);
        startingMoraleUp = 100;
        tile.animations.play('redden');

        turnSwitch = true;
      } else {
      tile.animations.play('redden');
      targetUnit = false;
      }
    } else {
      targetUnit = false;
      tile.animations.play('redden');
      tile.x = unit.x;
      tile.y = unit.y;

    }

  }
}



function tileCollision(tile) {
  for (var i = 0; i < tileGroup.children.length; i++) {
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds().inflate(-4, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}

function unitCollision(tile) {
  for (var i = 0; i < allUnits.length; i++) {
    var a = tile.getBounds();
    var b = allUnits[i].getBounds().inflate(0, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      unitColliding = true;
      targetUnit = allUnits[i];
      return allUnits[i];
    } else {
      unitColliding = false;
    }
  }
}

function unitSpecialTile(unit) {
  for (var j = 0; j < specialTile.children.length; j++) {
    var a = unit.getBounds();
    var b = specialTile.children[j].getBounds().inflate(-4, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}



function unitRangeTile(unit) {
  if (unit.unit.constructor.name === 'Archer') {
    for (var i = 0; i < rangeTile.children.length; i++) {
      var a = unit.getBounds();
      var b = rangeTile.children[i].getBounds();
      if (Phaser.Rectangle.intersects(a, b)) {
        return true;
      }
    }
  } else {
    return false;
  }
}
///Menu Function//////////////////////////////////////////////////////

function mainMenu () {
  menu = game.add.image(0, 0, 'menu');
  menu.inputEnabled = true;
  menu.events.onInputDown.add(startGame, this);
}

function victoryScreen() {
  // hpBarTop.kill();
  mover.kill();
  winScreen = game.add.image(0, 0, 'victory');
  winScreen.inputEnabled = true;
  winScreen.events.onInputDown.add(restartGame, this);
}

function defeatScreen() {
  // hpBarTop.destroy();
  mover.kill();
  loseScreen = game.add.image(0, 0, 'defeat');
  loseScreen.inputEnabled = true;
  loseScreen.events.onInputDown.add(restartGame, this);
}

function startGame() {
  menu.destroy();
  createMoraleBars();
  playerTurn(turn);
}

function restartGame() {
  window.location.reload(false);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
