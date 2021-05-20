# Simple Platformer

In this project, I created a very simple platformer game using Phaser3, a Javascript-based library for creating games. This is an arcade game, meaning that the goal is to get as much of a high score as possible.

## Instructions

You can play the game right now [by clicking here](https://simple-platform-jumper.netlify.app/)

Use the arrow keys to move around in the game, collect as many stars as possible while avoiding the bombs.

## Built With

- JavaScript
- Jest
- Webpack
- Phaser3

## Getting Started

To get a local copy up and running follow these steps.

1. Clone or copy repository, and navigate to the the `development` branch

2. Run `npm install` to install all required node packages

3. Run `npm run start` this will start up a local server, and open a new tab at `http://localhost:8080/`

4. If you wish to build a deployment version of the game, run `npm run build`, this will create all the necessary compressed files in the `dist` directory

## Testing

Run `npm jest` to run the tests.

## Game Design Document
- The assets used in the game can be found in the `src/assets` directory, and they include images and sound effects used for the game, these are: 
1. Bomb image => `bomb.png`
2. Character images sprite sheet, which contains all the required images to make the character's animations => `character.png`
3. Coin image => `coin.png`
4. Platform image => `platform.png`
5. Sky image => `sky.png`
6. Coin collection sound effect => `coin.mp3`
7. Jump Sound effect => `jump.mp3`
8. Game End Sound effect => `lose.mp3`

- The level design in this game is very simple but it is based on a tested concept. The platforms can be divided into 3 categories according to their elevation, the ground, middle platform, and higher platforms. The player can go from the lower to the higher platforms only using the middle one. The higher platforms and the middle one are where the coins will be spawned, which gives an incentive for the player to go to these platforms, however these platforms are also where the bombs are most likely to be.

- The game has a natural progression in difficulty, like all arcade games, it starts off as impossible to lose, where the player has just to collect the different coins, this makes sure that the player has a good understanding of how the mechanics work before sending in the first bomb. The higher the amount of coins that the player catches, the higher the amount of bombs and thus the difficulty of the game will become. The bombs are set to have a random velocity and direction, but they are always set to spawn in the  opposite side to where the player is currently standing, which makes the game challenging but fair.


## AUTHOR

**AYMAN JABR**

- Github: [![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AymanJabr/)
- Linkedin: [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayman-jabr/)


## Show your support

Give a ⭐️ if you like this project!

## License :memo:
# Released under MIT License

Copyright (c) 2021 Ayman Jabr.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.