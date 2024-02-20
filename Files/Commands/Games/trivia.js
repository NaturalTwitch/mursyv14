const { Trivia } = require('discord-gamecord');
const { Message } = require('discord.js');

module.exports = {
  name: 'trivia',
  description: 'Play trivia game',
  async execute(client, message, cmd, args, Discord) {
    console.log(args[0])
    if (!args[0]) {
      message.channel.send(`Please mention the difficulty { easy | medium | hard }`)
      return
    }

    const choice = [
      'multiple',
      'single'
    ]

    const results = Math.floor((Math.random() * choice.length))
    const difficulty = args[0].toLowerCase(); // Get the difficulty from the arguments
    if (args[0] === 'easy' || args[0] === 'medium' || args[0] === 'hard') { // Check if the difficulty is valid
      const Game = new Trivia({
        message: message,
        isSlashGame: false,
        embed: {
          title: 'Trivia',
          color: '#5865F2',
          description: 'You have 60 seconds to guess the answer.'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        trueButtonStyle: 'SUCCESS',
        falseButtonStyle: 'DANGER',
        mode: choice[results],  // multiple || single
        difficulty: difficulty,  // Set the difficulty based on the argument
        winMessage: 'You won! The correct answer is {answer}.',
        loseMessage: 'You lost! The correct answer is {answer}.',
        errMessage: 'Unable to fetch question data! Please try again.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      Game.startGame();
      Game.on('gameOver', async result => {
        const winstatus = result.result;

        if (winstatus === 'win') {
          const previouswinpoints = await getcorrectpoints(message, client)
          const currentwinpoints = Math.floor(Number(previouswinpoints) + 1)

          client.db.query(`
          insert into leaderboard (user_id, correct_answers) 
          values ($1, $2) 
          on conflict (user_id)
          do update set correct_answers = $2`, [message.author.id, currentwinpoints]
          )

          const winmessage = [
            `Congratulations! You've earned 1 points. Your current points: ${currentwinpoints}. Keep up the great work!`,
            `Well done! You've scored 1 points. Your current points: ${currentwinpoints}. Keep racking up those wins!`,
            `Great job! You've gained 1 points. Your current points: ${currentwinpoints}. Keep the winning streak alive!`,
            `Impressive! You've secured 1 points. Your current points: ${currentwinpoints}. Keep dominating the game!`,
            `Bravo! You've collected 1 points. Your current points: ${currentwinpoints}. Keep aiming high and achieving more!`
          ]

          let congrats = Math.floor((Math.random() * winmessage.length))

          message.channel.send(winmessage[congrats])
        } else if (winstatus === 'lose') {
          const previouslosepoints = await getwrongpoints(message, client)
          const currentlosepoints = Math.floor(Number(previouslosepoints) + 1)

          client.db.query(`
          insert into leaderboard (user_id, incorrect_answers) 
          values ($1, $2) 
          on conflict (user_id)
          do update set incorrect_answers = $2`, [message.author.id, currentlosepoints]
          )

          const losemessage = [
            `Unfortunately, you lost. Your current lose points: ${currentlosepoints}.`,
            `Regrettably, you didn't win. Your current lose points: ${currentlosepoints}. Keep playing and improving!`,
            `Your luck didn't favor you this time. Current lose points: ${currentlosepoints}. Keep playing, stay determined!`,
            `Not quite there this time. Current lose points: ${currentlosepoints}. Stay focused and keep challenging yourself!`,
            `Regretfully, you didn't hit the mark. Current lose points: ${currentlosepoints}. Stay resilient, keep pushing!`
          ]

          let sorry = Math.floor((Math.random() * losemessage.length))

          message.channel.send(losemessage[sorry])
        }
      });
    } else {
      message.channel.send(`Invalid difficulty. Please choose either easy, medium, or hard.`);
    }
  }
}

async function getcorrectpoints(message, client) {
  const response = await client.db.query(`select correct_answers from leaderboard where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].correct_answers
  return null;
}

async function getwrongpoints(message, client) {
  const response = await client.db.query(`select incorrect_answers from leaderboard where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].incorrect_answers
  return null;
}