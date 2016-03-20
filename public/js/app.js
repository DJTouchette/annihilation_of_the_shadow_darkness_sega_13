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
    },

    update: function() {
		// Function called 60 times per second
        this.hello_sprite.angle += 1;

        damageHealth(hpBar1);
    },

    function damageHealth(bar){
      playerHealth -= 10;
      if(playerHealth < 0) playerHealth = 0;
      bar.setPercent(playerHealth);
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');
