// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function() { };
game_state.main.prototype = {

    create: function() {
      // the following code will be merged with army sprites and menu

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

      // draw graphics of individual morale bar for each army
      // army should be a sprite
      createBarIndividual(game, army);

    },

    update: function() {
      //decrease aggreagate bar
      damageHealth(moraleBar);
      //decrease individual bar
      setBarPercent(game, army, newValue);
    },

    // bar is an instance of HealthBar
    function damageHealth(bar){
      testHealth -= 10;
      if(testHealth < 0) testHealth = 0;
      bar.setPercent(testHealth);
    }

};

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');
