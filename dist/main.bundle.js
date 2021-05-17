/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n\nvar config = {\n  type: Phaser.AUTO,\n  width: 800,\n  height: 600,\n  physics: {\n    \"default\": 'arcade',\n    arcade: {\n      gravity: {\n        y: 300\n      },\n      debug: false\n    }\n  },\n  scene: {\n    preload: preload,\n    create: create,\n    update: update\n  }\n};\nvar player;\nvar stars;\nvar bombs;\nvar platforms;\nvar cursors;\nvar score = 0;\nvar gameOver = false;\nvar scoreText;\nvar game = new Phaser.Game(config);\n\nfunction preload() {\n  this.load.image('sky', 'assets/sky.png');\n  this.load.image('ground', 'assets/platform.png');\n  this.load.image('star', 'assets/star.png');\n  this.load.image('bomb', 'assets/bomb.png');\n  this.load.spritesheet('dude', 'assets/dude.png', {\n    frameWidth: 32,\n    frameHeight: 48\n  });\n}\n\nfunction create() {\n  //  A simple background for our game\n  this.add.image(400, 300, 'sky'); //  The platforms group contains the ground and the 2 ledges we can jump on\n\n  platforms = this.physics.add.staticGroup(); //  Here we create the ground.\n  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)\n\n  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); //  Now let's create some ledges\n\n  platforms.create(600, 400, 'ground');\n  platforms.create(50, 250, 'ground');\n  platforms.create(750, 220, 'ground'); // The player and its settings\n\n  player = this.physics.add.sprite(100, 450, 'dude'); //  Player physics properties. Give the little guy a slight bounce.\n\n  player.setBounce(0.2);\n  player.setCollideWorldBounds(true); //  Our player animations, turning, walking left and walking right.\n\n  this.anims.create({\n    key: 'left',\n    frames: this.anims.generateFrameNumbers('dude', {\n      start: 0,\n      end: 3\n    }),\n    frameRate: 10,\n    repeat: -1\n  });\n  this.anims.create({\n    key: 'turn',\n    frames: [{\n      key: 'dude',\n      frame: 4\n    }],\n    frameRate: 20\n  });\n  this.anims.create({\n    key: 'right',\n    frames: this.anims.generateFrameNumbers('dude', {\n      start: 5,\n      end: 8\n    }),\n    frameRate: 10,\n    repeat: -1\n  }); //  Input Events\n\n  cursors = this.input.keyboard.createCursorKeys(); //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis\n\n  stars = this.physics.add.group({\n    key: 'star',\n    repeat: 11,\n    setXY: {\n      x: 12,\n      y: 0,\n      stepX: 70\n    }\n  });\n  stars.children.iterate(function (child) {\n    //  Give each star a slightly different bounce\n    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n  });\n  bombs = this.physics.add.group(); //  The score\n\n  scoreText = this.add.text(16, 16, 'score: 0', {\n    fontSize: '32px',\n    fill: '#000'\n  }); //  Collide the player and the stars with the platforms\n\n  this.physics.add.collider(player, platforms);\n  this.physics.add.collider(stars, platforms);\n  this.physics.add.collider(bombs, platforms); //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function\n\n  this.physics.add.overlap(player, stars, collectStar, null, this);\n  this.physics.add.collider(player, bombs, hitBomb, null, this);\n}\n\nfunction update() {\n  if (gameOver) {\n    return;\n  }\n\n  if (cursors.left.isDown) {\n    player.setVelocityX(-160);\n    player.anims.play('left', true);\n  } else if (cursors.right.isDown) {\n    player.setVelocityX(160);\n    player.anims.play('right', true);\n  } else {\n    player.setVelocityX(0);\n    player.anims.play('turn');\n  }\n\n  if (cursors.up.isDown && player.body.touching.down) {\n    player.setVelocityY(-330);\n  }\n}\n\nfunction collectStar(player, star) {\n  star.disableBody(true, true); //  Add and update the score\n\n  score += 10;\n  scoreText.setText('Score: ' + score);\n\n  if (stars.countActive(true) === 0) {\n    //  A new batch of stars to collect\n    stars.children.iterate(function (child) {\n      child.enableBody(true, child.x, 0, true, true);\n    });\n    var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);\n    var bomb = bombs.create(x, 16, 'bomb');\n    bomb.setBounce(1);\n    bomb.setCollideWorldBounds(true);\n    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);\n    bomb.allowGravity = false;\n  }\n}\n\nfunction hitBomb(player, bomb) {\n  this.physics.pause();\n  player.setTint(0xff0000);\n  player.anims.play('turn');\n  gameOver = true;\n}\n\n//# sourceURL=webpack://endless-platformer-phaser/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkendless_platformer_phaser"] = self["webpackChunkendless_platformer_phaser"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["common"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;