// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };
game_state.main.prototype = {

    create: function() {
    	// Fuction called after 'preload' to setup the game
        this.hello_sprite = game.add.sprite(250, 300, 'hello');
        var playerHealth = 100;
        var testHealth = 100;
        var hpBar1;
        var graphics;

        //Health bar
        var barConfig = {
          width: 20,
          height: 100,
          x: 5,
          y: 100,
          flipped: true
        }

        hpBar1 = new HealthBar(this.game, barConfig);
        hpBar1.setFixedToCamera(true);

        // draw graphics
        graphics = this.game.add.graphics(0,0);
        // set a fill and line style
        graphics.beginFill(0x00FF00);
        graphics.drawRect(0, 0, 50, 10);
        console.log(graphics.width);
        player.addChild(graphics);
    },

    update: function() {
		// Function called 60 times per second
        this.hello_sprite.angle += 1;

        //decrease aggreagate bar
        damageHealth(hpBar1);
        //decrease individual bar
        damageGraph(setWidth(testHealth));
    },

    function damageHealth(bar){
      playerHealth -= 10;
      if(playerHealth < 0) playerHealth = 0;
      bar.setPercent(playerHealth);
    }, 

    function damageGraph(newWidth){
      game.add.tween(graphics).to( { width: newWidth }, 200, Phaser.Easing.Linear.None, true);
    }

    function setWidth(newValue){
      if(newValue < 0) newValue = 0;
      if(newValue > 100) newValue = 100;
      console.log("The graphics width is:" + graphics.width);
      //TODO: DO NOT HARD CODE - get the individual width
      newWidth = (newValue * 50) / 100;
      console.log("The new width: " + newWidth);
      return newWidth;
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');
