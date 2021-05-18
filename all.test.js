const {showScoreList, addScoreAndSend} = require('./src/leader-board.js')


// console.log(showScoreList())
// console.log(addScoreAndSend(250))

test('Check that new Score is successfully saved', () => {
    myValue = ''
    addScoreAndSend(250).then(data => {
        expect(data.result).toBe("Leaderboard score created correctly.");
    })
    
});

test('Check that the score list is correctly returned', () => {
    myValue = ''
    showScoreList().then(data => {
        expect(data.result[0].user).toBe("Another one");
    })

});