
const DELAY_PAUSE_GAME = 0.3;
const DELAY_CREATING_ENEMY = 2;
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var sprite;

var mouth;
// Mouth (enemy) initial position

var mouthPrepared;
var mouthStartDelay = 4.7;
var mouthDelayText;
const MOUTH_DELAY_DECREMENT = 0.05;

var mouthOriginX = 200;
var mouthOriginY = 200;

var mouthDelay = 1;
var mouthSpeed = 400;

var text = null;
var textReflect = null;

var timer;


var branch;
var branchSize = 65;



var score = 0;
var scoreIncrement = 10;


var lost = true;

// Texts

var gameOverText = "Game Over\n Score: ";
var brocoliMotivationText = "You are a happy broccoli, don't let them eat you!!";
var scoreText;


WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};


function preload() {
    game.load.image('arrow', 'images/brocolito2.png');
    game.load.image('mouth', 'images/mouth1.png');
    game.load.image('branch', 'images/rama.png');

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.bitmapFont('font', 'css/fonts/GOODDP.TTF');

  //  game.load.audio('brocolitoMusic', 'sounds/brocolitoMusic.mp3');
}


function createText() {
  var motivationText = game.add.text(game.world.width * 0.4, game.world.height * 0.05, brocoliMotivationText);
  motivationText.fontSize = 20;

  if (!scoreText) {
    scoreText = game.add.text(game.world.width * 0.05, game.world.height * 0.05, "Score: 0");
  }

  motivationText.font = 'Revalia';
  scoreText.font = 'Revalia';

}

function create() {

    mouthPrepared = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    if(!scoreText) {
      scoreText = game.add.text(game.world.width * 0.05, game.world.height * 0.05, "Score: 0");
    }

    mouthDelayText = game.add.text(game.world.centerX, game.world.centerY, "Start in " + mouthStartDelay.toFixed(2));
    //game.sound.play('brocolitoMusic');


    // Texts


    //  Create our Timer
    // timer = game.time.create(false);

     //  Set a TimerEvent to occur after n milisecs.

     //timer.loop(branchCreatingInterval, createbranch, this);
     createbranch();

     //  Start the timer running - this is important!
     //  It won't start automatically, allowing you to hook it to button events and the like.
     //timer.start();


     playerPosition = new Phaser.Point();

     playerPosition.x = mouthOriginX;
     playerPosition.y = mouthOriginY;

     game.stage.backgroundColor = '#12e355';
  //  game.physics.arcade.gravity.y = 200;

    sprite = game.add.sprite(500, 350, 'arrow');

    mouth = game.add.sprite(200, 150, 'mouth');


    var size = 90;

    sprite.width = size;
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

}

function createbranch () {
    branch = game.add.sprite(game.world.randomX * 0.9, game.world.randomY * 0.9, 'branch');
    game.physics.enable(branch, Phaser.Physics.ARCADE);
    branch.width = branchSize * 1.2;
    branch.height = branchSize;
    scoreText.setText("Score: " + score);
    scoreText.font = 'Revalia';
}

function enemyCollision (obj1, obj2) {
    game.stage.backgroundColor = '#016000';
    drawText ();

    game.time.events.add(Phaser.Timer.SECOND * DELAY_PAUSE_GAME, pauseGame, this);

}


function branchCollision (obj1, obj2) {
  score += scoreIncrement;
  branch.destroy();
  createbranch();
}

function pauseGame () {
  pause ();
}


function drawText () {
    if (lost) {
      lost = false;
      text = game.add.text(game.world.centerX, game.world.centerY, gameOverText + score);
      text.font = "Revalia";

    //  Centers the text
      text.anchor.set(0.5);
      text.align = 'center';

    //  Our font + size
      text.fontWeight = 'bold';
      text.stroke= "#07530a";
      text.fontSize = 50;
      text.fill = '#000000';
      text.strokeThickness = 10;

    }
}


function decrementStartTime () {
  mouthStartDelay -= MOUTH_DELAY_DECREMENT;
  if (mouthStartDelay <= 0.1) mouthPrepared = true;
  return mouthStartDelay;
}


function update() {

  // just move without rotation.
  if (mouthPrepared) {
    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 100);
    game.physics.arcade.moveToXY(mouth, sprite.x, sprite.y, mouthDelay, mouthSpeed);
    mouthDelayText.destroy();
  }
  else {
    mouthDelayText.setText ("Start in " + decrementStartTime().toFixed(2));
  }

  // move with rotation.
  //mouth.rotation = game.physics.arcade.moveToXY(mouth, playerPosition.x, playerPosition.y, mouthDelay, mouthSpeed);

  game.physics.arcade.collide(sprite, mouth, enemyCollision, null, this);
  game.physics.arcade.collide(sprite, branch, branchCollision, null, this);

}

function render() {
  //  game.debug.spriteInfo(sprite, 32, 32);
}
