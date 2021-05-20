const fetch = require('node-fetch');

const showScoreList = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/FtTbSPgjuEfSKeMCYm4O/scores/');
  const data = await response.json();
  const finalResults = await data.result.sort((a, b) => ((a.score < b.score) ? 1 : -1))
    .slice(0, 5).map((a) => `\n ${a.user}: ${a.score}`);
  console.log(finalResults);
  return finalResults;
};

const addScoreAndSend = async (myScore, myName) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/FtTbSPgjuEfSKeMCYm4O/scores/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: myName,
      score: myScore,
    }),
  });
  const data = await response.json();
  return data;
};

export {
  showScoreList, addScoreAndSend,
};