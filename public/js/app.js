//VARIABLES START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// var marker;
// var canMove;
var map;
// var tween;
var tileGroup;
var music;
var allUnits = [];
var mover;
var unit;
var turnSwitch;
var turn = 0;
var limitX;
var limitY;
//ARMY MORALE BAR////////////////////
var barConfigTop = {
  width: 20,
  height: 100,
  x: 800,
  y: 530,
  flipped: true
};
// var barConfigBottom = {
//   width: 20,
//   height: 100,
//   x: 810,
//   y: 300,
//   flipped: true
// };
/////////////////////////////////////
//Unit Types////////////////////////
var footman = {
      troops: 100,
      att: 50,
      def: 5,
      spd: 4,
    };
////////////////////////////////////
//VARIABLES END/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PRELOAD START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {
//Map///////////////////////////////////////////////////
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
////////////////////////////////////////////////////////
//Tiles///////////////////////////////////////////////////
  game.load.image('wall', 'assets/.png');
  game.load.spritesheet('movetile', 'assets/movetile.png', 48, 48);
  game.load.image('move', 'assets/move.png');
  game.load.image('cantmove', 'assets/cantmove.png');
//////////////////////////////////////////////////////////
//Units///////////////////////////////////////////////////
  game.load.atlasJSONHash('soldier', 'assets/units/soldier.png', 'assets/units/soldier.json');
  game.load.atlasJSONHash('camus', 'assets/units/camus.png', 'assets/units/camus.json');
//////////////////////////////////////////////////////////
//Music///////////////////////////////////////////////////
  game.load.audio('battle', 'assets/battle.mp3');
//////////////////////////////////////////////////////////
//Menu///////////////////////////////////////////////////
  game.load.spritesheet('title', 'assets/title.png');
  // Loads all border assets (/public/js/hud/border.js)
  loadBorder();
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
  map.createFromTiles([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], null, 'wall', collisionLayer, tileGroup);
  game.physics.arcade.enable(tileGroup);
// //MAP END////////////////////////////////////////
//MENU START///////////////////////////////////////
  // Unit screen
  var unit = {type: 'Horseman', 'Morale': 3, 'Atk': 5, 'Def': 2, 'Spd': 6, tile: {terrain: 'Grass', buff: ['Spd', -3]}};
  makeUnitBar(unit);
//MENU END////////////////////////////////////////
//OTHER SPRITES START///////////////////////////
  bottomSide = game.add.group();
  topSide = game.add.group();
//OTHER SPRITES END////////////////////////////
//Call Create Functions HERE//////////////////
createSide(150, 550, bottomSide, 'soldier', 4);
createSide(150, 15, topSide, 'camus', 10);
createMoraleBars();
playerTurn(turn);
addStats(topSide, footman);
//Create Functions CALLED////////////////////
//CREATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//UPDATE START//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(){
  if (turnSwitch) {
    mover.kill();
    turnSwitch = false;
    if (turn < 19) {
      turn += 1;
    } else if (turn === 19) {
      turn = 0;
    }
    playerTurn(turn);
    console.log(turn);
  }
//UPDATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//RENDER START//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function render () {
  game.debug.text('Tile X: ' + collisionLayer.getTileX(game.input.activePointer.worldX) * 48, 48, 69, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + collisionLayer.getTileY(game.input.activePointer.worldY) * 48, 48, 48, 'rgb(0,0,0)');
//RENDER END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//FUNCTIONS///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//Create Sides//////////////////////////////////////////////////////
function createSide(x, y, group, sprite, frame_pos) {
  for (var i = 0; i < 10; i ++) {
    soldier = group.create(x + (i * 60), y, sprite);
    soldier.anchor.setTo(0.5, 0.5);
    soldier.inputEnabled = true;
    soldier.frame = frame_pos;
    createTroopBar(soldier);
    allUnits.push(soldier);
  }  
}

function addStats(group, unitType){
  for (var i = 0; i < group.length; i ++) {
    group.children[i].stats = unitType
  }
}
//Morale Bar//////////////////////////////////////////////////////
function createMoraleBars(){
  hpBarTop = new HealthBar(this.game, barConfigTop);
  hpBarTop.setFixedToCamera(true);
  // hpBarTop.bringToTop();brings to top but erases the menu
  // hpBarBottom = new HealthBar(this.game, barConfigBottom);
  // hpBarBottom.setFixedToCamera(true);
}

function createTroopBar(sprite){
  graphics = this.game.add.graphics(-11, -6);
  graphics.beginFill(0X00FF00);
  graphics.drawRect(0, 0, 50, 10);
  sprite.addChild(graphics);
}
///Move Functions//////////////////////////////////////////////////////

function playerTurn (i) {
    unit = allUnits[i];
    mover = game.add.tileSprite(unit.x, unit.y, 48, 48, 'movetile', 1);
    mover.anchor.setTo(0.5, 0.5);
    limitX = unit.x;
    limitY = unit.y;
    mover.animations.add('redden', [0, 1], 3, false);
    mover.inputEnabled = true;
    mover.input.enableDrag(true);
    mover.input.enableSnap(48, 48, true, true);
    mover.events.onDragStop.add(movePlayer, this);
}

function movePlayer(tile, sprite) {
  if ( (Math.abs(Math.floor(limitX / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(limitY / 48) - background.getTileY(tile.y)) <= 4 ) && !tileCollision(tile) && !unitCollision(tile)) {
    unit.x = tile.x;
    unit.y = tile.y;
  } else {
    tile.animations.play('redden');
  }
}

function tileCollision(tile) {
  for (var i = 0; i < tileGroup.children.length; i++) {
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}

function unitCollision(tile) {
  for (var i = 0; i < allUnits.length; i++) {
    var a = tile.getBounds();
    var b = allUnits[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////