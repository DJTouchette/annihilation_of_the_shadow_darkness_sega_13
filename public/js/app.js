//Variables
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var marker;
var canMove;
var map;
var tween;
var tileGroup;
var music;

//PRELOAD START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {

  game.load.tilemap('testMap', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('test_map', 'assets/test_map.png');
  game.load.image('green', 'assets/star.png');
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
//PRELOAD END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}






//CREATE START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create() {
  //Variables
  var playerHealth = 100;
  var testHealth = 100;
  var hpBar1;
  var graphics;
  var barConfig = {
    width: 20,
    height: 100,
    x: 800,
    y: 300,
    flipped: true
  };
// MUSIC START///////////////////////////////////
  music = game.add.audio('battle');
  music.play();
// MUSIC END////////////////////////////////////

//MAP START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  map = game.add.tilemap('testMap');
  map.addTilesetImage('test_map');
  background = map.createLayer('Tile Layer 1');
  backgroundOL = map.createLayer('overlays');
  collisionLayer = map.createLayer('collision');
  map.setCollisionBetween(13, 27, true, 'collision');
  game.physics.arcade.enable(map, 'collision');
  tileGroup = game.add.group();
  map.createFromTiles([13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], null, 'green', collisionLayer, tileGroup);
//MAP END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PLAYER START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  player = game.add.sprite(600, 400, 'camus');
  player.anchor.setTo(0.5, 0.5);

  //Player Animations    name      frames    fps  loop or not to loop
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // Movement Sprites
  left = game.add.tileSprite(player.x - 48, player.y, 48, 48, 'green');
  left.anchor.setTo(0.5, 0.5);
  left.inputEnabled = true;
  left.input.enableDrag(true);
  left.input.enableSnap(48, 48, true, true);
  right = game.add.tileSprite(player.x + 48, player.y, 48, 48, 'green');
  right.anchor.setTo(0.5, 0.5);
  right.inputEnabled = true;
  right.input.enableDrag(true);
  right.input.enableSnap(48, 48, true, true);
  up = game.add.tileSprite(player.x, player.y - 48, 48, 48, 'green');
  up.anchor.setTo(0.5, 0.5);
  up.inputEnabled = true;
  up.input.enableDrag(true);
  up.input.enableSnap(48, 48, true, true);
  down = game.add.tileSprite(player.x, player.y + 48, 48, 48, 'green');
  down.anchor.setTo(0.5, 0.5);
  down.inputEnabled = true;
  down.input.enableDrag(true);
  down.input.enableSnap(48, 48, true, true);
  down.events.onDragStop.add(movePlayer, this);
//PLAYER END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//IHEALTH BAR START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  hpBar1 = new HealthBar(this.game, barConfig);
  hpBar1.setFixedToCamera(true);
  // draw graphics
  graphics = this.game.add.graphics(-25,-35);
  // set a fill and line style
  graphics.beginFill(0x00FF00);
  graphics.drawRect(0, 0, 50, 10);
  player.addChild(graphics);
//HEALTH BAR END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MENU START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Player screen
  // Generates playerHUD
  // makeHudPlayer('Jon', ['Swordman', 'Archer', 'Horseman']);
  // makeSecondFrame(opponentText('Jen', ['Swordman', 'Archer', 'Horseman']) );
  // startTurn();

  // Unit screen
  var unit = {type: 'Horseman', 'Morale': 3, 'Atk': 5, 'Def': 2, 'Spd': 6, tile: {terrain: 'Grass', buff: ['Spd', -3]}};
  makeUnitBar(unit);

//MENU END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CREATE END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////
function update(){


}

///Misc Functions//////////////////////////////////////////////////////
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
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b) === true) {
      return true;
      break;
    } else {
      return false;
    }
  }
}
