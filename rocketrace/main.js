
var game = new Phaser.Game(400, 550, Phaser.AUTO, 'game_div');

var main_state = {
	preload: function() {  
  	this.game.stage.backgroundColor = '#71c5cf';
  	this.game.load.image('rocket1', 'assets/rocket1.png'); 
    this.game.load.image('rocket2', 'assets/rocket2.png');
    this.game.load.image('wall', 'assets/wall.jpeg');
    this.game.load.audio('boing', 'assets/boing.mp3');  
	},

	create: function() {  
  	this.rocket1 = this.game.add.sprite(250, 430, 'rocket1');
    this.rocket2 = this.game.add.sprite(100, 430, 'rocket2');
    this.wall = this.game.add.sprite(0,520,'wall');
    this.boing = this.game.add.audio('boing');  

  	this.rocket1.body.gravity.y = 2600;
    this.rocket2.body.gravity.y = 2600; 

  	var q_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var p_key = this.game.input.keyboard.addKey(Phaser.Keyboard.P)
  	q_key.onDown.add(this.jump, this);
    p_key.onDown.add(this.bump, this); 
	},

	update: function() { 
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
    this.boing.play();  
    this.rocket2.body.velocity.y = -200;
    this.rocket2.body.gravity.y = 2600;
    leftclicks++;
  },
  bump: function() {  
    this.boing.play();  
    this.rocket1.body.velocity.y = -200; 
    this.rocket1.body.gravity.y = 2600;
  },
	restart_game: function() {  
    leftclicks = 0;
    this.game.state.start('main');
	},
};

game.state.add('main', main_state);  
game.state.start('main'); 
