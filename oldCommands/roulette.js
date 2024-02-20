module.exports = {
  name: 'roulette',
  description: 'Play roulette',
  async execute(client, message, cmd, args, Discord) {
    const colors = ['red', 'black', 'green', 'red', 'black'];
    const color = args[1];
    const betAmount = parseInt(args[0]);
    const userBalance = await getBalance(message, client)

    // Check if the user has provided a valid bet and amount
    if (!color || !betAmount || isNaN(betAmount)) {
      return message.reply('Please provide a valid bet and amount.');
    }

    // Check if the color is valid
    if (!colors.includes(color.toLowerCase())) {
      return message.reply('Please choose a valid color (red, black, or green).');
    }

    // Simulate a roulette spin
    const result = colors[Math.floor(Math.random() * colors.length)];

    // Calculate the payout
    let payout = 0;
    if (color.toLowerCase() === result) {
      payout = betAmount * 2;
    }

    // Update user's balance and send a message

    if (userBalance < betAmount) {
      return message.reply("You don't have enough balance to place this bet.");
    }

    const str = `${result}`;
    const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);

    const resultEmbed = new Discord.MessageEmbed()
      .setColor(`${result.toUpperCase()}`)
      .setTitle('Roulette Result')
      .setThumbnail(`https://thumbs.gfycat.com/LivelyObviousAnhinga-size_restricted.gif`)
      .addField('Color', `${capitalizedStr}`, true)
      .addField('Amount', `${betAmount}`, true)
      .addField('Payout', `${payout}`, true)
      .addField('Balance', `${userBalance - betAmount + payout}`, true);

    await client.db.query(
      `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
      [message.author.id, Number(userBalance) - Number(betAmount) + Number(payout)],
    );

    return message.channel.send({ embeds: [resultEmbed] });
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
