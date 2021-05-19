import 'phaser';

import coin from './assets/coin.png';
let config = {width: 800, height: 600}


export default class LeaderBoardScene extends Phaser.Scene {
    constructor() {
        super('leaderboardScene');
        console.log("entered in constructor")
    }

    preload() {
    }

    create() {
        // Game
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('Game');
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton2');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton1');
        });
    }

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height)
        );
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

};