//VARIABLES START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game = new Phaser.Game(1000, 600, Phaser.AUTO, "game_div", { preload: preload, mainMenu: mainMenu, create: create, update: update, render: render });
var map;
var tileGroup;
var music;
var fullScreen;
var playStopImage;
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
var currentGroup;
var currentPlayer;
var moveRange;
var endGame;
var redWins;
var blueWins;
var turnCount = 0;
var sideSwitch = true;
var spritesBorder = [
  {position: 'horizontal', path: 'assets/border/horizontal.png'},
  {position: 'bottomLeft', path: 'assets/border/bottom_left.png'},
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
  width: 813,
  height: 45,
  x: 407,
  y: 0,
  bg: {color: '#0047b3'},
  bar: {color: '#ff3300'},
};

// starting morale is overall morale (100) divided by 2. Each side is worth 50.
var startingMoraleBottom = 50; //should create starting morale for each group
var startingMoraleUp = 50;
var previousMoraleUp = 0;
var previousMoraleBottom = 0;
var changeMoraleUp = 0;
var changeMoraleBottom = 0;
//VARIABLES END/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//PRELOAD START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {
//Map////////////////////////////////////////////////////////
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('horseman_range', 'assets/horseman_range.png');
  game.load.image('footman_range', 'assets/footman_range.png');
  game.load.image('archer_range', 'assets/archer_range.png');
  game.load.image('armored_range', 'assets/armored_range.png');
  game.load.image('menu', 'assets/background_image.png');
  game.load.image('victory', 'assets/victory.png');
  game.load.image('defeat', 'assets/defeat.png');
///////////////////////////////////////////////////////////
//Units///////////////////////////////////////////////////
  game.load.atlasJSONHash('footman', 'assets/units/footman.png', 'assets/units/footman.json');
  game.load.atlasJSONHash('archer', 'assets/units/archer.png', 'assets/units/archer.json');
  game.load.atlasJSONHash('horseman', 'assets/units/horseman.png', 'assets/units/horseman.json');
  game.load.atlasJSONHash('armored', 'assets/units/armored.png', 'assets/units/armored.json');
  game.load.image('grave', 'assets/units/grave.png', 46, 46);
//////////////////////////////////////////////////////////
//Tiles///////////////////////////////////////////////////
  game.load.image('wall', 'assets/wall.png');
  game.load.spritesheet('movetile', 'assets/movetile.png', 48, 48);
  game.load.image('move', 'assets/move.png');
  game.load.image('cantmove', 'assets/cantmove.png');
//////////////////////////////////////////////////////////
//Music///////////////////////////////////////////////////
  game.load.audio('battle', 'assets/battle.mp3');
  game.load.image('play', 'assets/play.png');
  game.load.image('stop', 'assets/stop.png');
//////////////////////////////////////////////////////////
//Menu///////////////////////////////////////////////////
  game.load.spritesheet('title', 'assets/title.png');
  game.load.image('waiting', 'assets/waiting.png');
  // Loads all border assets (/public/js/hud/border.js)
  loadBorder(spritesBorder);
  // Loads Unit frame assets (/public/js/hud/units.js)
  loadUnitFrame();
  //Loads start round btn (/public/js/hud/startrnd.js)
  game.load.image('full_screen', 'assets/full_screen.gif');
  game.load.image('full_screen_exit', 'assets/full_screen_exit.png');

//////////////////////////////////////////////////////////
//PRELOAD END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

//CREATE START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create() {
  //Variables
  var graphics;
//MUSIC START///////////////////////////////////////
  music = game.add.audio('battle');
  music.play();
//MUSIC END////////////////////////////////////////
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
//MAP END///////////////////////////////////////////
//MOVEMENT RANGE///////////////////////////////////
  moveRange = game.add.image(0, 0, 'horseman_range');
  moveRange.anchor.setTo(0.465, 0.465);
  mover = game.add.tileSprite(20, 20, 48, 48, 'movetile', 1);
  mover.animations.add('redden', [0, 1], 3, false);
  mover.inputEnabled = true;
  mover.input.priorityID = 1;
  mover.input.enableDrag(true);
  mover.input.enableSnap(48, 48, true, true);
  mover.events.onDragStop.add(movePlayer, this);
//MOVEMENT RANGE END////////////////////////////////
//SOUND BUTTONS////////////////////////////////////
  playStopImage = game.add.sprite(792, 20, 'play');
  playStopImage.inputEnabled = true;
  playStopImage.scale.setTo(0.04, 0.04);
  playStopImage.events.onInputDown.add(playStopSound, this);
///////////////////////////////////////////////////
//OTHER SPRITES START//////////////////////////////
  bottomSide = game.add.group();
  bottomSide.name = 'bottomside';
  topSide = game.add.group();
  topSide.name = 'topside';
  topSide.player = 2;
  bottomSide.player = 1;
//OTHER SPRITES END////////////////////////////
//Call Create Functions HERE//////////////////
  createMoraleBars();
  mainMenu();
  createSide(144, 528, bottomSide, 'footman', 6);
  createSide(144, 48, topSide, 'footman', 7);
  sortUnits();
  playerTurn(turn);
//Create Functions CALLED////////////////////
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  fullScreen = game.add.sprite(762, 22, 'full_screen');
  fullScreen.inputEnabled = true;
  fullScreen.scale.setTo(0.15, 0.15);
  fullScreen.events.onInputDown.add(fullScreenMode, this);
  // fullScreenLabel = game.add.text(700, 200, "Full Screen");
  // fullScreenLabel.inputEnabled = true;
  // fullScreenLabel.events.onInputDown.add(fullScreenMode, this);
//CREATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


//UPDATE START//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(){
  if (turnSwitch) {
    allUnits[turn].unit.tileCheck();
    allUnits[turn].unit.moraleBuff();
    turnSwitch = false;
    if (turn < 19) {
      turn += 1;
    } else if (turn === 19) {
      turn = 0;
    }
    if (allUnits[turn].parent.name === currentGroup) {
      window.socket.emit('disableOther', currentGroup);
    }
    playerTurn(turn);
    turnCount += 1;
  }

  if (blueWins && currentGroup === 'bottomside') {
    victoryScreen();
    window.socket.emit('defeat');
  } else if (blueWins && currentGroup === 'topside') {
    defeatScreen();
    window.socket.emit('victory');
  }
  if (redWins && currentGroup === 'topside') {
    victoryScreen();
    window.socket.emit('defeat');
  } else if (redWins && currentGroup === 'bottomside') {
    defeatScreen();
    window.socket.emit('victory');
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
function playStopSound(){
  if(music.paused == true){
    music.resume();
    playStopImage.loadTexture('play');
  }else{
    music.pause();
    playStopImage.loadTexture('stop');
  }
}

function fullScreenMode(){
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
    fullScreen.loadTexture('full_screen');
  }
  else {
    game.scale.startFullScreen(false);
    fullScreen.loadTexture('full_screen_exit');
  }  
}