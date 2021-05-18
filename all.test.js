const { showScoreList, addScoreAndSend } = require('./src/leader-board');

test('Check that new Score is successfully saved', () => {
  addScoreAndSend(250).then((data) => {
    expect(data.result).toBe('Leaderboard score created correctly.');
  });
});

test('Check that the score list is correctly returned', () => {
  showScoreList().then((data) => {
    expect(data.result[0].user).toBe('Another one');
  });
});