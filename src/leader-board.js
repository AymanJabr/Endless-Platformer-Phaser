const fetch = require('node-fetch');

const showScoreList = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/')
  .then((response) => response.json())
  .then((data) => {
    let finalResults = data.result.sort((a, b) => ((a.score < b.score) ? 1 : -1))
      .slice(0, 5).map((a) => `\n ${a.user}: ${a.score}` )
    console.log (finalResults)
    return finalResults
  })
  .catch((err) => {
    console.error(err);
  });

const addScoreAndSend = (myScore, myName) => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/efrnqEJRF6YCD6jcqp0F/scores/', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: myName,
    score: myScore,
  }),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => console.error(err));

module.exports = {
  showScoreList, addScoreAndSend,
};