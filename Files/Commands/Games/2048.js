const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
    name: '2048',
    description: 'Play Rock Paper Scissors with a friend',
    async execute(client, message, args) {
const Game = new TwoZeroFourEight({
  message: message,
  isSlashGame: false,
  embed: {
    title: '2048',
    color: '#5865F2'
  },
  emojis: {
    up: '⬆️',
    down: '⬇️',
    left: '⬅️',
    right: '➡️',
  },
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  playerOnlyMessage: 'Only {player} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', async result => {

  const previousHighscore = await gethighscore(message, client)
  if(!previousHighscore){
    client.db.query(`
          insert into leaderboard (user_id, highscore) 
          values ($1, $2) 
          on conflict (user_id)
          do update set highscore = $2`, [message.author.id, result.score]
          )
    message.channel.send(`New High Score ${result.score}`)
  } else if(result.score > previousHighscore){
    client.db.query(`
          insert into leaderboard (user_id, highscore) 
          values ($1, $2) 
          on conflict (user_id)
          do update set highscore = $2`, [message.author.id, result.score]
          )

          const newHighScore = [
            `Congrats! You beat your High Score of ${previousHighscore}. New Highscore: ${result.score}. Amazing achievement!`,
            `You crushed it! Previous High Score: ${previousHighscore}. New Highscore: ${result.score}. Amazing job!`,
            `Incredible! Surpassing High Score ${previousHighscore}. New Highscore: ${result.score}. Unstoppable performance!`,
            `Victory! Exceeded High Score ${previousHighscore}. New Highscore: ${result.score}. Unleash your greatness!`,
            `Awesome! You smashed your High Score ${previousHighscore}. New Highscore: ${result.score}. Unbelievable skills!`
          ]

          let congrats = Math.floor((Math.random() * newHighScore.length))
          message.channel.send(newHighScore[congrats])
  } else {
    const score = [
      `Oh no! You couldn't beat your previous high score ${previousHighscore}. Your current score is ${result.score}.`,
      `Unfortunately, you didn't surpass your previous high score ${previousHighscore}. Your current score is ${result.score}. Keep pushing!`,
      `Don't worry! You didn't beat your previous high score ${previousHighscore}, but your current score is ${result.score}. Keep striving for greatness!`,
      `Close, but not quite there. Your current score is ${result.score}, falling short of your previous high score ${previousHighscore}. Keep trying!`,
      `It's okay, you didn't surpass your previous high score ${previousHighscore}. Your current score is ${result.score}. Keep practicing and you'll improve!`,
      `Missed it this time. Your current score is ${result.score}, not enough to beat your previous high score ${previousHighscore}. Keep aiming higher!`
    ]
    let sorry = Math.floor((Math.random() * score.length))

    message.channel.send(score[sorry])
  }
 
});
    }
}

async function gethighscore(message, client) {
  const response = await client.db.query(`select highscore from leaderboard where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].highscore
  return null;
}