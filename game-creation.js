const fetch = require('node-fetch');

// 'Game with ID: FtTbSPgjuEfSKeMCYm4O  added.'

async function createGame() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Bomb Doger',
    }),
  });
  const data = await response.json();
  console.log(data);
}

createGame();