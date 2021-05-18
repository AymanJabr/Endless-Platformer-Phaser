import Phaser from 'phaser';
import bomb from './assets/bomb.png';

import dude from './assets/dude.png';
import character from './assets/character.png'
// import characterLeft from './assets/character-left-walk.png'
// import characterRight from './assets/character-right-walk.png'
// import characterIdle from './assets/character-still.png'

import platform from './assets/platform.png';
import sky from './assets/sky.png';
import star from './assets/coin.png';
import coinSound from './assets/coin.mp3'
import jumpSound from './assets/jump.mp3'
import loseSound from './assets/lose.mp3'


var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var collectCoin
var jumpingSound
var losingSound

function preload() {
    this.load.image('sky', sky);
    this.load.image('ground', platform);
    this.load.image('star', star);
    this.load.image('bomb', bomb);

    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('character', character, { frameWidth: 43, frameHeight: 47 })
    // this.load.spritesheet('character-left', characterLeft, { frameWidth: 43, frameHeight: 47 })
    // this.load.spritesheet('character-right', characterRight, { frameWidth: 43, frameHeight: 47 })
    // this.load.spritesheet('character-idle', characterIdle)

    this.load.audio('coinSound',[coinSound])
    this.load.audio('jumpSound',[jumpSound] )
    this.load.audio('loseSound',[loseSound])
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    collectCoin = this.sound.add("coinSound", { loop: false })
    jumpingSound = this.sound.add('jumpSound', { loop: false })
    losingSound = this.sound.add('loseSound', { loop: false })

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    // player = this.physics.add.sprite(100, 450, 'dude');
    player = this.physics.add.sprite(100,450, 'character')

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character', { start: 4, end: 6 }),
        frameRate: 14,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'character', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character', { start: 1, end: 3 }),
        frameRate: 14,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) {
        losingSound.play()
        gameOver = false
        this.registry.destroy(); // destroy registry
        this.events.off();﻿ // disable all active events
        this.scene.restart();﻿﻿﻿﻿ // restart current scene
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(250)
    }

    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        jumpingSound.play()
        
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    

    //  Add and update the score
    collectCoin.play()
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

const config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const showScoreList = () => {
    allScores = fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/')
        .then(response => response.json())
        .then(data => data.result)
        .catch(err => {
            console.error(err)
        })
    
    return allScores
}

const addScoreAndSend = () => {

    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": "Another one",
            "score": score
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.error(err)
        })

}

const game = new Phaser.Game(config);