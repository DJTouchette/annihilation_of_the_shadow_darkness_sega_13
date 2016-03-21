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

function preload() {
  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('move', 'assets/move.png');
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


  //player
  player = game.add.sprite(96, 96, 'dude');
  player.anchor.setTo(0.5, 0.5);
  // game.physics.arcade.enable(player);
  
  // player.body.collideWorldBounds = true;
  // player.body.fixedRotation = true;
  // player.body.clearShapes();
  // player.body.addRectangle(48, 48, 0, 0);
  //player animations    name      frames    fps  loop or not to loop
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // score tracking
  // scoreText = render(); 
  // game.input.onDown.add(movePlayer, this);

  // movement sprites
  left = game.add.tileSprite(player.x - 48, player.y, 48, 48, 'move');
  left.anchor.setTo(0.5, 0.5);
  left.inputEnabled = true;
  left.input.enableDrag(true);
  left.input.enableSnap(48, 48, true, true);
  left.events.onDragStop.add(movePlayer, this);
  right = game.add.tileSprite(player.x + 48, player.y, 48, 48, 'move');
  right.anchor.setTo(0.5, 0.5);
  right.inputEnabled = true;
  right.input.enableDrag(true);
  right.input.enableSnap(48, 48, true, true);
  right.events.onDragStop.add(movePlayer, this);
  up = game.add.tileSprite(player.x, player.y - 48, 48, 48, 'move');
  up.anchor.setTo(0.5, 0.5);
  up.inputEnabled = true;
  up.input.enableDrag(true);
  up.input.enableSnap(48, 48, true, true);
  up.events.onDragStop.add(movePlayer, this);
  down = game.add.tileSprite(player.x, player.y + 48, 48, 48, 'move');
  down.anchor.setTo(0.5, 0.5);
  down.inputEnabled = true;
  down.input.enableDrag(true);
  down.input.enableSnap(48, 48, true, true);
  down.events.onDragStop.add(movePlayer, this);

  // game.physics.arcade.overlap(down, collisionLayer);

  

  // map.setTileIndexCallback([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], tileCollision, this, down);

  
}

function movePlayer(tile) {

  if ( (Math.abs(Math.floor(player.x / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(player.y / 48) - background.getTileY(tile.y)) <= 4 ) && !tileCollision(tile)) {
  // tween = game.add.tween(player).to( { x: background.getTileX(pointer.x) * 48, y: background.getTileY(pointer.y) * 48}, 2000, Phaser.Easing.Linear.Out, true);
  // console.log(collisionLayer.getTileX(pointer.x), collisionLayer.getTileY(pointer.y));
  player.x = tile.x;
  player.y = tile.y;
  console.log(tileCollision(tile));
  }

  // console.log(checkOverlap(player));
}

function tileCollision(tile) {
  for (var i = 0; i < tileGroup.children.length; i++) {
    console.log(tileGroup.children);
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b) === true) {
      return true;
    }
  }
  // return Phaser.Rectangle.intersects(tile.getBounds(), tileGroup.getBounds());
  // tileGroup.children.every( function intersect(element, index, array) {
  //   return !(Phaser.Rectangle.intersects(tile.getBounds(), element.getBounds()));
  // });

}

function update() {
  // console.log(tileCollision(down));
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


