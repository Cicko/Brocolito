
const DELAY_PAUSE_GAME = 0.3;
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var sprite;


var mouth;
// Mouth (enemy) initial position
var mouthOriginX = 200;
var mouthOriginY = 200;

var mouthDelay = 1;
var mouthSpeed = 400;

var text = null;
var textReflect = null;

var timer;


var coin;
var coinSize = 45;



var score = 10;
var scoreIncrement = 10;


var lost = true;

// Texts

var gameOverText = "Game Over... score: ";
var brocoliMotivationText = "You are a happy broccoli, don't let them eat you!!";
var scoreText;


console.log("GAMELOGIC CARGADO");


function preload() {
    game.load.image('arrow', 'images/brocolito.png');
    game.load.image('mouth', 'images/mouth1.png');
    game.load.image('coin', 'images/coin.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    // Texts
    game.add.text(game.world.width * 0.5, game.world.height * 0.05, brocoliMotivationText);
    scoreText = game.add.text(game.world.width * 0.05, game.world.height * 0.05, "Actual score: " + score + " points.")

    //  Create our Timer
    // timer = game.time.create(false);

     //  Set a TimerEvent to occur after n milisecs.

     //timer.loop(coinCreatingInterval, createCoin, this);
     createCoin();

     //  Start the timer running - this is important!
     //  It won't start automatically, allowing you to hook it to button events and the like.
     //timer.start();


     playerPosition = new Phaser.Point();

     playerPosition.x = mouthOriginX;
     playerPosition.y = mouthOriginY;

     game.stage.backgroundColor = '#00aa00';
  //  game.physics.arcade.gravity.y = 200;

    sprite = game.add.sprite(500, 350, 'arrow');

    mouth = game.add.sprite(200, 150, 'mouth');

    var size = 90;

    sprite.width = size * 1.3;
    sprite.height = size;

    mouth.width = size;
    mouth.height = size;

    sprite.anchor.setTo(0.5, 0.5);

    //sprite.body.velocity.setTo(200, 200);

    // 1 is 100 % of energy return
    //sprite.bounce.set(1);
    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.enable(mouth, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = true;
    mouth.body.allowRotation = true;

    sprite.body.collideWorldBounds = true;
    mouth.body.collideWorldBounds = true;

// WALLS
    //var wall1 = new Phaser.Physics.Box2D.Body(this.game, null, 655, 230, 0);
    //wall1.setRectangle(20, 50, 0, 0, 0);
    //wall1.static = true;

}


function createCoin () {
    coin = game.add.sprite(game.world.randomX * 0.9, game.world.randomY * 0.9, 'coin');
    game.physics.enable(coin, Phaser.Physics.ARCADE);
    coin.width = coinSize;
    coin.height = coinSize;
    scoreText.setText("Actual score: " + score + " points.");

}

function enemyCollision (obj1, obj2) {
    game.stage.backgroundColor = '#ff0000';
    drawText ();

    game.time.events.add(Phaser.Timer.SECOND * DELAY_PAUSE_GAME, pauseGame, this);

}


function coinCollision (obj1, obj2) {
  score += scoreIncrement;
  coin.destroy();
  createCoin();
}

function pauseGame () {
  pause ();
}


function drawText () {
    if (lost) {
      lost = false;
      text = game.add.text(game.world.centerX, game.world.centerY, gameOverText + score + " points.");

    //  Centers the text
      text.anchor.set(0.5);
      text.align = 'center';

    //  Our font + size
      text.font = 'Arial';
      text.fontWeight = 'bold';
      text.fontSize = 70;
      text.fill = '#ffffff';

  }


}

function update() {
  sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 100);

  // just move without rotation.
  game.physics.arcade.moveToXY(mouth, sprite.x, sprite.y, mouthDelay, mouthSpeed);

  // move with rotation.
  //mouth.rotation = game.physics.arcade.moveToXY(mouth, playerPosition.x, playerPosition.y, mouthDelay, mouthSpeed);

  game.physics.arcade.collide(sprite, mouth, enemyCollision, null, this);
  game.physics.arcade.collide(sprite, coin, coinCollision, null, this);

}

function render() {
  //  game.debug.spriteInfo(sprite, 32, 32);
}
