const fetch = require('node-fetch')

const showScoreList = () => {
    return fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/')
        .then(response => response.json())
        .then((data) => {
            console.log(data.result)
            return data.result
        })
        .catch(err => {
            console.error(err)
        })

}

const addScoreAndSend = (myScore) => {

    return fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": "Another one",
            "score": myScore
        })
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            return data
        })
        .catch(err => {
            console.error(err)
        })
    // showScoreList()

}


module.exports = {
    showScoreList, addScoreAndSend
}