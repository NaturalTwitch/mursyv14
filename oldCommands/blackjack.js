const blackjack = require('discord-blackjack');

module.exports = {
  name: 'blackjack',
  aliases: ['bj'],
  description: 'Play blackjack',
  async execute(client, message, cmd, args, Discord) {
    const userBalance = await getBalance(message, client);
    const bet = args[0];

    if (!bet) {
      message.channel.send(`Please ensure you mention your bets`);
      return;
    }

    if (isNaN(bet)) {
      message.channel.send(`Please ensure your bet is a number`);
      return;
    }

    if (Number(bet) > userBalance) {
      message.channel.send(`You don't have enough to make this bet please try a lower amount`);
      return;
    }

    let game = await blackjack(message, { resultEmbed: true });

    console.log(game.result);

    if (game.result === 'WIN') {
      const payout = bet * 2;
      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [message.author.id, Number(userBalance) - Number(bet) + Number(payout)],
      );
      message.reply(
        `Congrats on Winning :tada: :tada:  Your new balance is <:MursyCoin:970535071528394807>${
          Number(userBalance) - Number(bet) + Number(payout)
        }`,
      );
    }
    if (game.result === 'LOSE') {
      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [message.author.id, Number(userBalance) - Number(bet)],
      );
    }
    if (game.result === 'CANCEL') {
      return;
    }
    if(game.result === 'TIE'){
        message.channel.send(`PUSH! The bet was returned to you`)
    }
  },
};

async function getBalance(message, client) {
  const user = message.author;
  const response = await client.db.query(`select balance from balance where user_id = $1`, [
    user.id,
  ]);
  if (response && response.rowCount) return response.rows[0].balance;
  return null;
}
