import 'phaser';


export default class LeaderBoardScene extends Phaser.Scene {
    constructor() {
        super('leaderboardScene');
        console.log("entered in constructor")
        this.score = 0
        this.data = ''
    }

    init(data){
        this.score = data.score
        this.data = data.data.join(", ")
        
    }
    

    preload() {
    }

    create() {
        // Game
        this.gameButton = this.add.sprite(400, 600, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'Play Again', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('mainGameScene');
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton2');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton1');
        });









        this.creditsText = this.add.text(0, 0, `Your Score: ${this.score}`, { fontSize: '32px', fill: '#fff' });

        
        this.madeByText = this.add.text(0, 0, `Top 5 High Scores: ${this.data}`, { fontSize: '26px', fill: '#fff' });
        
        
        this.zone = this.add.zone(800 / 2, 600 / 2, 800, 600);

        Phaser.Display.Align.In.Center(
            this.creditsText,
            this.zone
        );

        Phaser.Display.Align.In.Center(
            this.madeByText,
            this.zone
        );

        this.madeByText.setY(1000);

        this.creditsTween = this.tweens.add({
            targets: this.creditsText,
            y: -100,
            ease: 'Power1',
            duration: 3000,
            delay: 1000,
            onComplete: function () {
                this.destroy;
            }
        });

        this.madeByTween = this.tweens.add({
            targets: this.madeByText,
            y: -200,
            ease: 'Power1',
            duration: 8000,
            delay: 1000,
            onComplete: function () {
                this.madeByTween.destroy;
            }.bind(this)
        });


    }

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(800 / 2, 500 - offset * 100, 800, 600)
        );
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }


};