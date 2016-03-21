var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var score = 0;
var scoreText;

function preload() {
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.spritesheet('title', 'assets/title.png');
  // Loads all border assets (/public/js/hud/border.js)
  loadBorder();
  // Loads Unit frame assets (/public/js/hud/units.js)
  loadUnitFrame();
  //Loads start round btn (/public/js/hud/startrnd.js)
  loadBtn();

}

function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);

  game.physics.p2.setImpactEvents(true);

  game.add.sprite(0, 0, 'star');
  game.add.sprite(95, 400, 'button');

  // Player screen
  //Generates playerHUD
  // makeHudPlayer('Jon', ['Swordman', 'Archer', 'Horseman']);
  // makeSecondFrame(opponentText('Jen', ['Swordman', 'Archer', 'Horseman']) );
  // placeBtn('Start', 'green');

  // Unit screen
  var unit = {type: 'Horseman', 'Morale': 3, 'Atk': 5, 'Def': 2, 'Spd': 6, tile: {terrain: 'Grass', buff: ['Spd', -3]}};
  makeUnitBar(unit);



  // map
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');

  background = map.createLayer('Tile Layer 1');
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollision([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true, 'collision');
  game.physics.p2.convertTilemap(map, 'collision');


  //player
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.p2.enable(player);
  player.body.collideWorldBounds = true;
  player.body.fixedRotation = true;
  player.body.clearShapes();
  player.body.addRectangle(48, 48, 0, 0);
  //player animations    name      frames    fps  loop or not to loop
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // score tracking
  scoreText = game.add.text( 16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
}

function update() {

  // player controls
  cursors = game.input.keyboard.createCursorKeys();
  player.body.velocity.x = 0;
  // player walk
  if (cursors.left.isDown) {
    player.body.moveLeft(200);
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.moveRight(200);
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.body.velocity.x = 0;
    player.frame = 4;
  }

  if (cursors.up.isDown) {
    player.body.moveUp(200);
    player.animations.play('left');
  } else if (cursors.down.isDown) {
    player.body.moveDown(200);
    player.animations.play('left');
  } else {
    player.animations.stop();
    player.body.velocity.y = 0;
    player.frame = 4;
  }

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
