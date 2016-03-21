//Variables
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var marker;
var canMove;
var map;
var tween;
var tileGroup;
var music;
var dragging;


//PRELOAD START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('green', 'assets/green.png');
  game.load.atlasJSONHash('soldier', 'assets/units/soldier.png', 'assets/units/soldier.json');
  game.load.atlasJSONHash('camus', 'assets/units/camus.png', 'assets/units/camus.json');
  game.load.audio('battle', 'assets/battle.mp3');
  game.load.spritesheet('title', 'assets/title.png');
  game.load.image('move', 'assets/move.png');
  game.load.image('cantmove', 'assets/cantmove.png');
  game.load.spritesheet('movetile', 'assets/movetile.png', 48, 48);

  // Loads all border assets (/public/js/hud/border.js)
  loadBorder();
  // Loads Unit frame assets (/public/js/hud/units.js)
  loadUnitFrame();
  //Loads start round btn (/public/js/hud/startrnd.js)
  loadBtn();
//PRELOAD END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//CREATE START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create() {
  //Variables
  var playerHealth = 100;
  var testHealth = 100;
  var hpBar1;
  var graphics;
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
// MUSIC START////////////////////////////////////
  music = game.add.audio('battle');
  music.play();
// MUSIC END//////////////////////////////////////
//MAP START///////////////////////////////////////
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');
  background = map.createLayer('Tile Layer 1');
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollisionBetween(13, 27, true, 'collision');
  game.physics.arcade.enable(map, 'collision');
  tileGroup = game.add.group();
  map.createFromTiles([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], null, 'green', collisionLayer, tileGroup);
  game.physics.arcade.enable(tileGroup);
// //MAP END////////////////////////////////////////
//MENU START///////////////////////////////////////
  // Unit screen
  var unit = {type: 'Horseman', 'Morale': 3, 'Atk': 5, 'Def': 2, 'Spd': 6, tile: {terrain: 'Grass', buff: ['Spd', -3]}};
  makeUnitBar(unit);
//MENU END////////////////////////////////////////
// //PLAYER START/////////////////////////////////
  player = game.add.sprite(96, 96, 'camus');
  player.anchor.setTo(0.5, 0.5);
  player.inputEnabled = true;
  player.events.onInputDown.add(playerTurn, this);
//PLAYER END/////////////////////////////////////
//OTHER SPRITES START///////////////////////////
  bottomSide = game.add.group();
  topSide = game.add.group();
//OTHER SPRITES END////////////////////////////
//Call Create Functions HERE//////////////////
createSide(150, 550, bottomSide, 'soldier', 4)
createSide(150, 15, topSide, 'camus', 10)
createMoraleBars();
createTroopBar(player);
//Create Functions CALLED////////////////////
//CREATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function update(){
}

function render () {
  game.debug.text('Tile X: ' + collisionLayer.getTileX(game.input.activePointer.worldX) * 48, 48, 69, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + collisionLayer.getTileY(game.input.activePointer.worldY) * 48, 48, 48, 'rgb(0,0,0)');
}

//FUNCTIONS///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//Create Sides//////////////////////////////////////////////////////
function createSide(x, y, group, sprite, frame_pos) {
  for (var i = 0; i < 10; i ++) {
    soldier = group.create(x + (i * 60), y, sprite);
    soldier.frame = frame_pos;
    createTroopBar(soldier);
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
function playerTurn (player) {
  down = game.add.tileSprite(player.x, player.y, 48, 48, 'movetile', 1);
  down.anchor.setTo(0.5, 0.5);
  down.animations.add('redden', [0, 1], 1, false);
  down.inputEnabled = true;
  down.input.enableDrag(true);
  down.input.enableSnap(48, 48, true, true);
  down.events.onDragStop.add(movePlayer, this);
}

function movePlayer(tile) {
  if ( (Math.abs(Math.floor(player.x / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(player.y / 48) - background.getTileY(tile.y)) <= 4 ) && !tileCollision(tile)) {
    player.x = tile.x;
    player.y = tile.y;
  } else {
    tile.animations.play('redden');
  }
}

function tileCollision(tile) {
  for (var i = 0; i < tileGroup.children.length; i++) {
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b) === true) {
      return true;
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////