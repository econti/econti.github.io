// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 550, Phaser.AUTO, 'game_div');
var leftRocketDiv = document.getElementById("leftRocketClicks");
var leftclicks = 0;


// Creates a new 'main' state that wil contain the game
var main_state = {
	preload: function() {  
  	// Change the background color of the game
  	this.game.stage.backgroundColor = '#71c5cf';
  	// Load the rocket1 sprite
  	this.game.load.image('rocket1', 'assets/rocket1.png'); 
    this.game.load.image('rocket2', 'assets/rocket2.png');
    this.game.load.image('wall', 'assets/wall.jpeg');
	},

	create: function() {  
  	// Display the rocket1 on the screen
  	this.rocket1 = this.game.add.sprite(250, 430, 'rocket1');
    this.rocket2 = this.game.add.sprite(100, 430, 'rocket2');
    this.wall = this.game.add.sprite(0,520,'wall');
  	// Add gravity to the rocket1 to make it fall
  	this.rocket1.body.gravity.y = 2600;
    this.rocket2.body.gravity.y = 2600; 

  	// Call the 'jump' function when the spacekey is hit
  	var q_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var p_key = this.game.input.keyboard.addKey(Phaser.Keyboard.P)
  	q_key.onDown.add(this.jump, this);
    p_key.onDown.add(this.bump, this); 
	},

	update: function() {  
  	// If the rocket1 is out of the world (too high or too low), call the 'restart_game' function
  	if(this.game.physics.overlap(this.rocket1, this.wall)){
      this.rocket1.body.gravity.y = 0;
      this.rocket1.body.velocity.y = 0;
      this.rocket1.body.y = 430;
    }
    if(this.game.physics.overlap(this.rocket2, this.wall)){
      this.rocket2.body.gravity.y = 0;
      this.rocket2.body.velocity.y = 0;
      this.rocket2.body.y = 430;
    }
    if (this.rocket1.inWorld == false){
      alert("P wins!");
      this.restart_game();
    }
    if (this.rocket2.inWorld == false){
      alert("Q wins!");
      this.restart_game();
    }
	},
	jump: function() {  
    // Add a vertical velocity to the rocket1
    this.rocket2.body.velocity.y = -200;
    this.rocket2.body.gravity.y = 2600;
   /* leftclicks++;
    leftRocketDiv.innerHTML = leftclicks;*/
  },
  bump: function() {  
    // Add a vertical velocity to the rocket1
    this.rocket1.body.velocity.y = -200; 
    this.rocket1.body.gravity.y = 2600;
  },

// Restart the game
	restart_game: function() {  
    // Start the 'main' state, which restarts the game
    leftclicks = 0;
    this.game.state.start('main');
	},
};

// Make the rocket1 jump 


// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 