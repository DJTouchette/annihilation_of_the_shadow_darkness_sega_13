// <<<<<<< HEAD
// // <<<<<<< HEAD
// var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// =======
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
// >>>>>>> 9502840e3fbe5cd3a34333868b5e308276df5515

var score = 0;
var scoreText;
var marker;
// var x;
// var y;
var canMove;
var tween;
var tilegroup;

function preload() {
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.atlasJSONHash('soldier', 'assets/units/soldier.png', 'assets/units/soldier.json');
  game.load.atlasJSONHash('camus', 'assets/units/camus.png', 'assets/units/camus.json');
  game.load.audio('battle', 'assets/battle.mp3');
  game.load.spritesheet('title', 'assets/title.png');
  // Loads all border assets (/public/js/hud/border.js)
  loadBorder();
  // Loads Unit frame assets (/public/js/hud/units.js)
  loadUnitFrame();
  //Loads start round btn (/public/js/hud/startrnd.js)
  loadBtn();

}


var music
//
var sprite;
var tween;
//

  game.add.sprite(0, 0, 'star');
  game.add.sprite(95, 400, 'button');

  // Player screen
  //Generates playerHUD
  // hudPlayer('Jon', ['Swordman', 'Archer', 'Horseman']);
  // openentFrame('Jen', ['Swordman', 'Archer', 'Horseman']);
  // placeBtn();

  // Unit screen
  unitBarMake(['Swordman', 'Archer', 'Horseman']);


function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.gravity = false;
  music = game.add.audio('battle');
  music.play();
  // map
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');

  background = map.createLayer('Tile Layer 1');
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollisionBetween(13, 27, true, 'collision');
  game.physics.arcade.enable(map, 'collision');

  //test enemy

  topSide = game.add.group();
  bottomSide = game.add.group();


  //player
// <<<<<<< HEAD
  player = game.add.sprite(32, game.world.height - 150, 'soldier');
  // player.scale.setTo(1.5);// this will enlarge the player size
  game.physics.p2.enable(player);
  player.body.collideWorldBounds = true;
  player.body.fixedRotation = true;
  player.body.clearShapes();
  player.body.addRectangle(48, 48, 0, 0);
// =======
  // player = game.add.sprite(48, 48, 'dude');
  // player.anchor.setTo(0.5, 0.5);
  // game.physics.arcade.enable(player);
  
  // player.body.collideWorldBounds = true;
  // player.body.fixedRotation = true;
  // player.body.clearShapes();
  // player.body.addRectangle(48, 48, 0, 0);
// >>>>>>> 9502840e3fbe5cd3a34333868b5e308276df5515
  //player animations    name      frames    fps  loop or not to loop
  player.animations.add('up', [3, 4, 5], true);
  player.animations.add('down', [9, 10, 11], true);
  player.animations.add('left', [0, 1, 2], true);
  player.animations.add('right', [6, 7, 8], true);

// <<<<<<< HEAD
///Clickable sprite
  sprite = game.add.sprite(600, 300, 'soldier');    
  sprite.frame = 10;
  sprite.anchor.setTo(0.5, 0.5);  
////

  //Generates topside group
  createSide(170, 30, topSide, 'camus', 10);
  //Generates bottomside group
  createSide(170, 570, bottomSide, 'soldier', 4);
// =======
  // score tracking
  // scoreText = render(); 
  // game.input.onDown.add(movePlayer, this);

  // movement sprites
  left = game.add.tileSprite(player.x - 48, player.y, 48, 48, 'star');
  left.anchor.setTo(0.5, 0.5);
  left.inputEnabled = true;
  left.input.enableDrag(true);
  left.input.enableSnap(48, 48, true, true);
  right = game.add.tileSprite(player.x + 48, player.y, 48, 48, 'star');
  right.anchor.setTo(0.5, 0.5);
  right.inputEnabled = true;
  right.input.enableDrag(true);
  right.input.enableSnap(48, 48, true, true);
  up = game.add.tileSprite(player.x, player.y - 48, 48, 48, 'star');
  up.anchor.setTo(0.5, 0.5);
  up.inputEnabled = true;
  up.input.enableDrag(true);
  up.input.enableSnap(48, 48, true, true);
  down = game.add.tileSprite(player.x, player.y + 48, 48, 48, 'star');
  down.anchor.setTo(0.5, 0.5);
  down.inputEnabled = true;
  down.input.enableDrag(true);
  down.input.enableSnap(48, 48, true, true);
  down.events.onDragStop.add(movePlayer, this);

  game.physics.arcade.overlap(down, collisionLayer);

  // map.setTileIndexCallback([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], tileCollision, this, down);

  
}

function movePlayer(tile) {

  if ( (Math.abs(Math.floor(player.x / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(player.y / 48) - background.getTileY(tile.y)) <= 4 )) {
  // tween = game.add.tween(player).to( { x: background.getTileX(pointer.x) * 48, y: background.getTileY(pointer.y) * 48}, 2000, Phaser.Easing.Linear.Out, true);
  // console.log(collisionLayer.getTileX(pointer.x), collisionLayer.getTileY(pointer.y));
  player.x = tile.x;
  player.y = tile.y;
  }

  // console.log(checkOverlap(player));
}

function tileCollision(tile, tiles) {
  if (Phaser.Rectangle.intersects(tile.getBounds(), tiles.getBounds())) {
    tile.input.enableDrag(false);
  }
// >>>>>>> 9502840e3fbe5cd3a34333868b5e308276df5515
}

function createSide(x, y, group, sprite, frame_pos) {
  for (var i = 0; i < 10; i ++) {
    footman = group.create(((i * 50) + x), y, sprite);
    footman.frame = frame_pos;
    game.physics.p2.enable(footman);
    footman.body.collideWorldBounds = true;
    footman.body.fixedRotation = true;
    footman.body.clearShapes();
    footman.body.addRectangle(48, 48, 0, 0);
    footman.body.static = true;
  }
}
////
function moveSprite (pointer) {
    sprite.y = pointer.y
    sprite.x = pointer.x  
  }
///

// <<<<<<< HEAD
function update() {
  // player controls
  cursors = game.input.keyboard.createCursorKeys();
  player.body.velocity.x = 0;
  player.frame = 4;
  // player walk
  if (cursors.left.isDown) {
    // player.body.moveLeft(200);
     player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    // player.body.moveRight(200);
     player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.body.velocity.x = 0;
  }

  if (cursors.up.isDown) {
    // player.body.moveUp(200);
     player.body.velocity.y = -150;
    player.animations.play('up');
  } else if (cursors.down.isDown) {
    // player.body.moveDown(200);
     player.body.velocity.y = 150;
    player.animations.play('down');
  } else {
    player.animations.stop();
    player.body.velocity.y = 0;
  }
  game.input.onDown.add(moveSprite, this);

}


function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    // background.visible =! background.visible;

}
// =======
// // Initialize Phaser, and creates a 400x490px game
// var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
// var game_state = {};

// // Creates a new 'main' state that wil contain the game
// game_state.main = function() { };
// game_state.main.prototype = {

//     create: function() {
//     	// Fuction called after 'preload' to setup the game
//         this.hello_sprite = game.add.sprite(250, 300, 'hello');
//         var playerHealth = 100;
//         var testHealth = 100;
//         var hpBar1;
//         var graphics;

//         //Health bar
//         var barConfig = {
//           width: 20,
//           height: 100,
//           x: 5,
//           y: 100,
//           flipped: true
//         }

//         hpBar1 = new HealthBar(this.game, barConfig);
//         hpBar1.setFixedToCamera(true);

//         // draw graphics
//         graphics = this.game.add.graphics(0,0);
//         // set a fill and line style
//         graphics.beginFill(0x00FF00);
//         graphics.drawRect(0, 0, 50, 10);
//         console.log(graphics.width);
//         player.addChild(graphics);
//     },

//     update: function() {
// 		// Function called 60 times per second
//         this.hello_sprite.angle += 1;

//         //decrease aggreagate bar
//         damageHealth(hpBar1);
//         //decrease individual bar
//         damageGraph(setWidth(testHealth));
//     },

//     function damageHealth(bar){
//       playerHealth -= 10;
//       if(playerHealth < 0) playerHealth = 0;
//       bar.setPercent(playerHealth);
//     }, 

//     function damageGraph(newWidth){
//       game.add.tween(graphics).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
//     }

//     function setWidth(newValue){
//       if(newValue < 0) newValue = 0;
//       if(newValue > 100) newValue = 100;
//       console.log("The graphics width is:" + graphics.width);
//       //TODO: DO NOT HARD CODE - get the individual width
//       newWidth = (newValue * 50) / 100;
//       console.log("The new width: " + newWidth);
//       return newWidth;
//     }
// };

// // Add and start the 'main' state to start the game
// game.state.add('main', game_state.main);
// game.state.start('main');
// >>>>>>> 7a210a123fd50b2a595c607e78481c9092867965
// =======
  // Phaser.Math.snapTo(player.body.x, 48);
  // Phaser.Math.snapTo(player.body.y, 48);
  // player controls
  // cursors = game.input.keyboard.createCursorKeys();
  
  // player.body.velocity.x = 0;
  // player.body.velocity.y = 0;

  // player walk
  // if (cursors.left.isDown) {
  //   player.body.moveLeft(48);
  //   player.animations.play('left');
  //   game.math.snapToFloor(player.x, 48, 0);
  //   game.math.snapToFloor(player.y, 48, 0);
  // } else if (cursors.right.isDown) {
  //   player.body.moveRight(48);
  //   player.animations.play('right');
  //   game.math.snapToFloor(player.x, 48, 0);
  //   game.math.snapToFloor(player.y, 48, 0);
  // }

  // if (cursors.up.isDown) {
  //   player.body.moveUp(48);
  //   player.animations.play('left');
  //   game.math.snapToFloor(player.x, 48, 0);
  //   game.math.snapToFloor(player.y, 48, 0);
  // } else if (cursors.down.isDown) {
  //   player.body.moveDown(48);
  //   player.animations.play('left');
  //   game.math.snapToFloor(player.x, 48, 0);
  //   game.math.snapToFloor(player.y, 48, 0);
  // }


  // if ( (Math.abs(Math.floor(player.x / 48) - background.getTileX(pointer.x)) + Math.abs(Math.floor(player.y / 48) - background.getTileY(pointer.y)) <= 4 )) {
  //   var tile = background.getTileXY(pointer.x, pointer.y)
  //   tile.lineStyle(1, 0xffffff, 1);
  //   tile.drawRect(0, 0, 48, 48);
  //   canMove = true;
  // }
  console.log(map.tiles())


}

// function checkOverlap(a) {
//   var boundsA = a.getBounds();
//   // var boundsB = b.getBounds();
//   var b = Phaser.Rectangle(240, 144, 48, 240);
//   return Phaser.Rectangle.intersects(boundsA, b);
// }

// function pickTile(player, pointer) {
//   var x = game.math.snapToFloor(pointer.x, 48, 0);
//   var y = game.math.snapToFloor(pointer.y, 48, 0);

//   currentTileMarker.x = x;
//   currentTileMarker.y = y;

//   x /= 48;
//   y /= 48;

//   currentTile = x + (y * 9);

// };

// function updateMarker () {
//   marker.x = background.getTileX(game.input.activePointer.worldX) * 48;
//   marker.y = background.getTileY(game.input.activePointer.worldY) * 48;

//   if (game.input.mousePointer.isDown && marker.y > 48) {
//     map.putTile(currentTile, background.getTileX(marker.x), background.getTileY(marker.y), background);
//   }

// };

// function createTileSelector() {

//     var tileSelector = game.add.group();

//     var tileSelectorBackground = game.make.graphics();
//     tileSelectorBackground.beginFill(0x000000, 0.8);
//     tileSelectorBackground.drawRect(0, 0, 800, 66);
//     tileSelectorBackground.endFill();

//     tileSelector.add(tileSelectorBackground);

//     var tileStrip = tileSelector.create(1, 1, bmd);
//     tileStrip.inputEnabled = true;
//     tileStrip.events.onInputDown.add(pickTile, this);

//     marker = game.add.graphics();
//     marker.lineStyle(2, 0x000000, 1);
//     marker.drawRect(0, 0, 48, 48);

//     currentTileMarker = game.add.graphics();
//     currentTileMarker.lineStyle(1, 0xffffff, 1);
//     currentTileMarker.drawRect(0, 0, 48, 48);

//     tileSelector.add(currentTileMarker);

// };

function render () {
  game.debug.text('Tile X: ' + collisionLayer.getTileX(game.input.activePointer.worldX) * 48, 48, 69, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + collisionLayer.getTileY(game.input.activePointer.worldY) * 48, 48, 48, 'rgb(0,0,0)');
}


// >>>>>>> 9502840e3fbe5cd3a34333868b5e308276df5515
