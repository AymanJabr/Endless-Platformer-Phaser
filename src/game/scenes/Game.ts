import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private stars!: Phaser.Physics.Arcade.Group;
    private bombs!: Phaser.Physics.Arcade.Group;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private score = 0;
    private gameOver = false;
    private scoreText!: Phaser.GameObjects.Text;
    private collectCoin!: Phaser.Sound.BaseSound;
    private jumpingSound!: Phaser.Sound.BaseSound;
    private losingSound!: Phaser.Sound.BaseSound;
    private name: string = '';

    constructor() {
        super('Game');
    }

    init(data: { name: string }) {
        this.name = data.name;
        this.score = 0;
        this.gameOver = false;
    }

    preload() {
        this.load.setPath('assets');

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'coin.png');
        this.load.image('bomb', 'bomb.png');

        this.load.spritesheet('character', 'character.png', { frameWidth: 43, frameHeight: 47 });

        this.load.audio('coinSound', 'coin.mp3');
        this.load.audio('jumpSound', 'jump.mp3');
        this.load.audio('loseSound', 'lose.mp3');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0).setDisplaySize(1280, 720);
        this.collectCoin = this.sound.add('coinSound', { loop: false });
        this.jumpingSound = this.sound.add('jumpSound', { loop: false });
        this.losingSound = this.sound.add('loseSound', { loop: false });

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(640, 688, 'ground').setScale(3.2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.platforms.create(900, 500, 'ground');
        this.platforms.create(1150, 300, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'character');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 17,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((child) => {
            const star = child as Phaser.Physics.Arcade.Sprite;
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar as any, undefined, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb as any, undefined, this);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.gameOver || !this.player.body) {
            return;
        }

        if (this.cursors?.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors?.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else if (this.cursors?.down.isDown) {
            this.player.setVelocityY(250);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors?.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.jumpingSound.play();
        }
    }

    private collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
        star.disableBody(true, true);

        this.collectCoin.play();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                const star = child as Phaser.Physics.Arcade.Sprite;
                star.enableBody(true, star.x, 0, true, true);
                return true;
            });

            for (let i = 0; i < 2; i++) {
                const x = (this.player.x < 640)
                    ? Phaser.Math.Between(640, 1280)
                    : Phaser.Math.Between(0, 640);

                const bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }
    }

    private hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Sprite) {
        if (this.gameOver) {
            return;
        }

        this.gameOver = true;
        this.physics.pause();
        this.losingSound.play();
        player.setTint(0xff0000);
        player.anims.play('turn');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.text(centerX, centerY - 50, 'GAME OVER', { fontSize: '64px', color: '#ff0000' }).setOrigin(0.5);
        this.add.text(centerX, centerY, `Final Score: ${this.score}`, { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'Click to Restart', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.restart();
        });
    }
}
