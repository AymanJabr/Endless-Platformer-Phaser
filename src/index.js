import Phaser from 'phaser';

import LeaderBoardScene from './LeaderBoardScene'

import MainGameScene from './MainGameScene';


const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  width: 800,
  height: 600,
  scene: [MainGameScene,LeaderBoardScene]
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('mainGameScene');
  }
}

window.game = new Game();
