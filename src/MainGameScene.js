import 'phaser'
import bomb from './assets/bomb.png';


import character from './assets/character.png';

import { addScoreAndSend, showScoreList } from './leader-board';



import platform from './assets/platform.png';
import sky from './assets/sky.png';
import star from './assets/coin.png';
import coinSound from './assets/coin.mp3';
import jumpSound from './assets/jump.mp3';
import loseSound from './assets/lose.mp3';

let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;
let collectCoin;
let jumpingSound;
let losingSound;



export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super('mainGameScene');
        console.log("entered in constructor")
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);

        this.load.spritesheet('character', character, { frameWidth: 43, frameHeight: 47 });

        this.load.audio('coinSound', [coinSound]);
        this.load.audio('jumpSound', [jumpSound]);
        this.load.audio('loseSound', [loseSound]);
    }

    create() {
        this.add.image(400, 300, 'sky');
        collectCoin = this.sound.add('coinSound', { loop: false });
        jumpingSound = this.sound.add('jumpSound', { loop: false });
        losingSound = this.sound.add('loseSound', { loop: false });


        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'character');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 4, end: 6 }),
            frameRate: 14,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'character', frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 1, end: 3 }),
            frameRate: 14,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bombs = this.physics.add.group();

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    }

    update() {
        if (gameOver) {
            losingSound.play();
            gameOver = false;

            showScoreList().then(data => {

                this.scene.start('leaderboardScene', { score: score, data: data })
            })
            
            return;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        } else if (cursors.down.isDown) {
            player.setVelocityY(250);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
            jumpingSound.play();
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        collectCoin.play();
        score += 10;
        scoreText.setText(`Score: ${score}`);

        if (stars.countActive(true) === 0) {
            stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb(player) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        addScoreAndSend(score).then((data) => console.log(data.result));

        gameOver = true;
    }

}

