const fetch = require('node-fetch');

const showScoreList = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/')
  .then((response) => response.json())
  .then((data) => data.result.sort((a, b) => ((a.score < b.score) ? 1 : -1))
    .slice(0, 5).map((a) => a.score))
  .catch((err) => {
    console.error(err);
  });

const addScoreAndSend = (myScore) => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: 'Another one',
    score: myScore,
  }),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => console.error(err));

module.exports = {
  showScoreList, addScoreAndSend,
};