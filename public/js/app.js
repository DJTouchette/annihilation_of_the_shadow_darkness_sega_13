// 'use strict'

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var score = 0;
var scoreText;
var marker;
// var x;
// var y;
var canMove;
var map;
var tween;
var tileGroup;
var dragging;

function preload() {
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('move', 'assets/move.png');
  game.load.image('cantmove', 'assets/cantmove.png');
  game.load.spritesheet('movetile', 'assets/movetile.png', 48, 48);
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);

  game.physics.p2.setImpactEvents(true);

  game.add.sprite(0, 0, 'star');

  // map
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');
  
  background = map.createLayer('Tile Layer 1');
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollisionBetween(13, 27, true, 'collision');
  game.physics.arcade.enable(map, 'collision');
  tileGroup = game.add.group();
  map.createFromTiles([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], null, 'star', collisionLayer, tileGroup);
  game.physics.arcade.enable(tileGroup);

  //player
  player = game.add.sprite(96, 96, 'dude');
  player.anchor.setTo(0.5, 0.5);
  player.inputEnabled = true;
  player.events.onInputDown.add(playerTurn, this);

  // down = game.add.tileSprite(player.x, player.y, 48, 48, 'movetile', 1);
  // down.anchor.setTo(0.5, 0.5);
  // down.inputEnabled = true;
  // down.input.enableDrag(true);
  // down.input.enableSnap(48, 48, true, true);
  // down.events.onDragStop.add(movePlayer, this);
  
}

function update() {

}

function render () {
  game.debug.text('Tile X: ' + collisionLayer.getTileX(game.input.activePointer.worldX) * 48, 48, 69, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + collisionLayer.getTileY(game.input.activePointer.worldY) * 48, 48, 48, 'rgb(0,0,0)');
}

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


