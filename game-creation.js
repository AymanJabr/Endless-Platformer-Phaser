const fetch = require('node-fetch')

// 'Game with ID: efrnqEJRF6YCD6jcqp0F added.'

fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "name": "Bomb Doger"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
        console.error(err)
    })