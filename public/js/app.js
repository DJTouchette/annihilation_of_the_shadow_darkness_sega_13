// <<<<<<< HEAD
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var score = 0;
var scoreText;

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
  map.setCollision([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true, 'collision');
  game.physics.p2.convertTilemap(map, 'collision');

  //test enemy

  topSide = game.add.group();
  bottomSide = game.add.group();


  //player
  player = game.add.sprite(32, game.world.height - 150, 'soldier');
  // player.scale.setTo(1.5);// this will enlarge the player size
  game.physics.p2.enable(player);
  player.body.collideWorldBounds = true;
  player.body.fixedRotation = true;
  player.body.clearShapes();
  player.body.addRectangle(48, 48, 0, 0);
  //player animations    name      frames    fps  loop or not to loop
  player.animations.add('up', [3, 4, 5], true);
  player.animations.add('down', [9, 10, 11], true);
  player.animations.add('left', [0, 1, 2], true);
  player.animations.add('right', [6, 7, 8], true);

///Clickable sprite
  sprite = game.add.sprite(600, 300, 'soldier');    
  sprite.frame = 10;
  sprite.anchor.setTo(0.5, 0.5);  
////

  //Generates topside group
  createSide(170, 30, topSide, 'camus', 10);
  //Generates bottomside group
  createSide(170, 570, bottomSide, 'soldier', 4);
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
