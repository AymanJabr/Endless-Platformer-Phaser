import 'phaser';
import platformImage from './assets/platform.png';
// import myForm from './form.html'
/* eslint-disable */
export default class InputNameScene extends Phaser.Scene {
    constructor() {
        super('inputNameScene');
    }

    init(data) {
        // this.score = data.score;
        // this.data = data.data.join(', ');
    }

    preload() {
        this.load.image('platformImage', platformImage);
    }


    create() {

        let instructionText = this.add.text(400, 300, 'Click on the name below, and enter you name', { fixedWidth: 500, fixedHeight: 50 })
        instructionText.setOrigin(0.5, 0.8)

        const text = this.add.text(400, 300, 'Jack Doe', { fixedWidth: 150, fixedHeight: 36 })
        text.setOrigin(0.5, 0.5)

        text.setInteractive().on('pointerdown', () => {
            this.rexUI.edit(text)
        })




        this.gameButton = this.add.sprite(400, 600, 'platformImage').setInteractive();
        this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'Start Game', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', () => {
            let name = text._text
            this.scene.start('mainGameScene', {name});
        });

        this.input.on('pointerover', (event, gameObjects) => {
            gameObjects[0].setTexture('platformImage');
        });

        this.input.on('pointerout', (event, gameObjects) => {
            gameObjects[0].setTexture('platformImage');
        });

    }

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(800 / 2, 500 - offset * 100, 800, 600),
        );
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton,
        );
    }

}