

(function(exports) {
  const DELAY_PAUSE_GAME = 0.3;
  const DELAY_QUIT_GAME = 1;
  const DELAY_CREATING_ENEMY = 2;
  const NEXT_MOUTH_SCORE = 200;
  const SCORE_TO_INCREMENT_MOUTH_SPEED = 100;
  const MOUTH_SPEED_INCREMENT = 1.4;
  const DELAY_REMOVE_COMBO_TEXT = 1;
  const COLLISION_INTERVAL = 1;
  const RESET_COMBO_DELAY = 0.6;
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

  var sprite;

  var alreadyCollided = false;

  var size;
  var mouth;
  var mouths;
  // Mouth (enemy) initial position

  var mouthPrepared;
  var mouthStartDelay = 4.7;
  var mouthDelayText;
  const MOUTH_DELAY_DECREMENT = 0.05;
  var mouthPlatform;
  var platformRadius = 64;
  var randomPos;

  var mouthOriginX = 200;
  var mouthOriginY = 200;

  var mouthDelay = 1;
  var mouthSpeed = 600;

  var mouthSound1;

  var text = null;
  var textReflect = null;

  var timer;
  var shakeWorld = 0;

  var branch;
  var branchSize = 65;



  var score = 0;
  var scoreIncrement = 10;


  var lost = true;

  var lives = 0;
  var livesText;

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
      //game.load.image('mouth', 'images/mouth.png');

      game.load.spritesheet('mouth', 'images/mouthSheet.png', 400, 100, 55);
      game.load.image('branch', 'images/rama.png');

      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      game.load.bitmapFont('font', 'css/fonts/GOODDP.TTF');

  }


  function createText() {
    var motivationText = game.add.text(game.world.width * 0.4, game.world.height * 0.05, brocoliMotivationText);




    livesText = game.add.text(game.world.width * 0.4, game.world.height * 0.1, "You have " + lives + " lives left.");

    motivationText.fontSize = 20;
    livesText.fontSize = 20;

    if (!scoreText) {
      scoreText = game.add.text(game.world.width * 0.05, game.world.height * 0.05, "Score: 0");
    }

    motivationText.font = 'Revalia';
    scoreText.font = 'Revalia';
    livesText.font = 'Revalia';

  }

  function create() {

      if (document.getElementById("extraLife").value == "yes") {
        lives = 2;
      }
      else {
        lives = 1;
      }

      mouthPrepared = false;

      game.physics.startSystem(Phaser.Physics.ARCADE);
      if(!scoreText) {
        scoreText = game.add.text(game.world.width * 0.05, game.world.height * 0.05, "Score: 0");
      }

      mouthDelayText = game.add.text(game.world.centerX, game.world.centerY, "Start in " + mouthStartDelay.toFixed(2));

       createbranch();

       playerPosition = new Phaser.Point();

       playerPosition.x = mouthOriginX;
       playerPosition.y = mouthOriginY;

       game.stage.backgroundColor = '#12e355';
    //  game.physics.arcade.gravity.y = 200;

      sprite = game.add.sprite(500, 350, 'arrow');

      mouth = game.add.sprite(game.world.width * 0.05, game.world.height * 0.95, 'mouth');

      var bite = mouth.animations.add('bite');

      mouth.animations.play('bite', 30, true);

      size = 90;

      sprite.width = size;
      sprite.height = size;

      mouth.width = size * 3;
      mouth.height = size;

      sprite.anchor.setTo(0.5, 0.5);

      //sprite.body.velocity.setTo(200, 200);

      // 1 is 100 % of energy return
      //sprite.bounce.set(1);
      //  Enable Arcade Physics for the sprite
      game.physics.enable(sprite, Phaser.Physics.ARCADE);
      game.physics.enable(mouth, Phaser.Physics.ARCADE);

      mouth.body.setSize(70,100,120,0);

      //  Tell it we don't want physics to manage the rotation
      sprite.body.allowRotation = true;
      mouth.body.allowRotation = true;

      sprite.body.collideWorldBounds = true;
      mouth.body.collideWorldBounds = true;

      mouths = new Array(mouth);



          if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
          ){
            onMobile = true;
            gyro.frequency = 10;
            gyro.startTracking(function(o) {
              // updating player velocity
              sprite.position.x += o.gamma * 3;
              sprite.position.y += o.beta * 3;
            });
          }
  }

  var onMobile = false;

  function createbranch () {
      branch = game.add.sprite(game.world.randomX * 0.9, game.world.randomY * 0.9, 'branch');
      game.physics.enable(branch, Phaser.Physics.ARCADE);
      branch.width = branchSize * 1.2;
      branch.height = branchSize;
      scoreText.setText("Score: " + score);
      scoreText.font = 'Revalia';
  }

  function enemyCollision (obj1, obj2) {
     if(!alreadyCollided) {
      lives--;
      playMarce();

      shakeWorld = 50;
      alreadyCollided = true;
      game.time.events.add(Phaser.Timer.SECOND * COLLISION_INTERVAL, canCollideAgain, this);
      if (lives == 0) {
        drawGameOverText();
        game.stage.backgroundColor = '#016000';
        game.time.events.add(Phaser.Timer.SECOND * DELAY_PAUSE_GAME, pauseGame, this);
      }
      else {
        livesText.setText( "You have " + lives + " lives left.");
      }
     }
  }


  function canCollideAgain () {
    alreadyCollided = false;
  }


var combo = -1;
var timeToFinishCombo;
var comboText;

  function branchCollision (obj1, obj2) {
    score += scoreIncrement;
    branch.destroy();

    if (this.game.time.totalElapsedSeconds() > timeToFinishCombo) combo = 0;
    else combo++;

    playGotItem(combo);

    if (combo > 0) {
        score += combo * scoreIncrement;
        if (combo == 1)
          comboText = game.add.text(game.world.centerX, game.world.centerY - game.world.height / 4, "COMBO x" + (combo+1));
        else
          comboText.setText("COMBO x" + (combo+1));

        comboText.font = "Revalia";
        comboText.fontSize = 60;
        comboText.stroke= "red";
        comboText.strokeThickness = 10;

        game.time.events.add(Phaser.Timer.SECOND * DELAY_REMOVE_COMBO_TEXT, removeComboText, this);
    }

    function removeComboText () {
      comboText.destroy();
    }

    function removeScoreIncrement () {

    }



    timeToFinishCombo = this.game.time.totalElapsedSeconds() + RESET_COMBO_DELAY;


    createbranch();
    if ((score + 10) % NEXT_MOUTH_SCORE == 0) {
      randomPos = new Phaser.Point();
      randomPos.x = game.world.randomX * 0.8;
      randomPos.y = game.world.randomY * 0.8;
      mouthPlatform = new Phaser.Circle(randomPos.x, randomPos.y,platformRadius);
    }
    if (score % NEXT_MOUTH_SCORE == 0) {
      createNewEnemy();
      mouthPlatform = null;
    }
    if (score % SCORE_TO_INCREMENT_MOUTH_SPEED == 0) {
      mouthSpeed /= MOUTH_SPEED_INCREMENT;
    }
  }

  function resetCombo () {

    combo = 0;
  }


  function createNewEnemy () {
      var m = game.add.sprite(randomPos.x | 250, randomPos.y | 250, 'mouth');

      playMouth();

      m.width = size * 3;
      m.height = size;
      game.physics.enable(m, Phaser.Physics.ARCADE);

      var bite = m.animations.add('bite');

      m.animations.play('bite', 30, true);

      m.body.setSize(70,100,120,0);
      m.body.allowRotation = true;
      m.body.collideWorldBounds = true;
      mouths.push(m);
  }

  var finished = false;


  // END GAME
  function pauseGame () {
    if (!finished) {
        document.getElementById("score").value = score;
        document.getElementById("scoreForm").submit();
        finished = true;
    }
  }


  function drawGameOverText () {
        text = game.add.text(game.world.centerX, game.world.centerY, gameOverText + score);
        text.font = "Revalia";

      //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

      //  Our font + size
        text.fontWeight = 'bold';
        text.stroke= "#07530a";
        text.strokeThickness = 10;
        text.fontSize = 50;
        text.fill = '#000000';
  }


  function decrementStartTime () {
    mouthStartDelay -= MOUTH_DELAY_DECREMENT;
    if (mouthStartDelay <= 0.1) {
      mouthPrepared = true;
      playMouth();
    }

    return mouthStartDelay;
  }


  function update() {

    if (shakeWorld > 0) {
      var rand1 = game.rnd.integerInRange(-20,20);
      var rand2 = game.rnd.integerInRange(-20,20);
      game.world.setBounds(rand1, rand2, game.width + rand1, game.height + rand2);
      shakeWorld--;
    }
    if (shakeWorld == 0) {
      game.world.setBounds(0, 0, game.width,game.height); // normalize after shake?
    }

    if (!onMobile) {
      sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 85);
    }

    if (mouthPrepared) {
      for (var i = 0; i < mouths.length; i++) {
        game.physics.arcade.moveToXY(mouths[i], sprite.x, sprite.y, mouthDelay, mouthSpeed);
      }
      mouthDelayText.destroy();
    }
    else {
      mouthDelayText.setText ("Start in " + decrementStartTime().toFixed(2));
    }

    // move with rotation.
    //mouth.rotation = game.physics.arcade.moveToXY(mouth, playerPosition.x, playerPosition.y, mouthDelay, mouthSpeed);


    for (var i = 0; i < mouths.length-1; i++) {
      game.physics.arcade.collide (mouths[i], mouths[i+1]);
    }

    for (var i = 0;i < mouths.length; i++) {
      game.physics.arcade.collide (sprite, mouths[i], enemyCollision, null, this);
    }

    game.physics.arcade.collide(sprite, branch, branchCollision, null, this);

  }

  function render() {
    //  game.debug.spriteInfo(sprite, 32, 32);
    game.debug.geom(mouthPlatform,'#006000');
  }


})(this);
