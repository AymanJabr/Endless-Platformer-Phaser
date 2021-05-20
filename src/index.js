import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

import InputNameScene from './InputNameScene';

import LeaderBoardScene from './LeaderBoardScene';

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
  dom: {
    createContainer: true,
  },
  parent: 'phaser-container',
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  width: 800,
  height: 600,
  scene: [InputNameScene, MainGameScene, LeaderBoardScene],
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('inputNameScene');
  }
}

window.game = new Game();
