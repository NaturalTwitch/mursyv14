const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'deposit',
  aliases: ['dep'],
  description: "This is the test command!",
  async execute(client, message, cmd, args, Discord) {

    let walletBalance = await getBalance(message, client)
    if (!walletBalance) {
      walletBalance = '0'
    }

    let bankBalance = await getBankBalance(message, client)
    if (!bankBalance) {
      bankBalance = '0'
    }

    if (Number(walletBalance) < 1) {
      const noBalance = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`Deposit`)
        .setDescription(`Sorry **${message.author.username}**, You cannot deposit an empty balance.`)
      message.channel.send({ embeds: [noBalance] })
      return;
    }

    if (args[0] === 'all') {
      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [message.author.id, Number(walletBalance) - Number(walletBalance)],
      );

      await client.db.query(
        `INSERT INTO balance (user_id, bank) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET bank = $2;`,
        [message.author.id, Number(bankBalance) + Number(walletBalance)],
      );

      const depositAll = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('Deposit')
        .setDescription(`We have successfully deposited <:MursyCoin:970535071528394807>${walletBalance}`)
        .addFields(
          {
            name: `Wallet Balance:`, value: `<:MursyCoin:970535071528394807>0`, inline: false
          },
          {
            name: `Bank Balance:`, value: `<:MursyCoin:970535071528394807>${Number(walletBalance) + Number(bankBalance)}`, inline: false
          }

        )
      message.channel.send({ embeds: [depositAll] })

      return;
    }

    if (Number(args[0]) < 1) return message.channel.send('We cannot deposit a negative balance')

    if (!Number(args[0])) return message.channel.send('Please ensure to you add the amount you want to deposit')


    if (Number(args[0]) > walletBalance) {
      const noMoney = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Deposit')
        .setDescription(`Sorry **${message.author.username}**, You don't have enough money to deposit this amount.`)
        .addFields(
          {
            name: `Wallet Balance:`, value: `<:MursyCoin:970535071528394807>${walletBalance}`
          }
        )
      message.channel.send({ embeds: [noMoney] })
    } else {

      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [message.author.id, Number(walletBalance) - Number(args[0])],
      );

      await client.db.query(
        `INSERT INTO balance (user_id, bank) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET bank = $2;`,
        [message.author.id, Number(bankBalance) + Number(args[0])],
      );
      const successfulDeposit = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('Deposit')
        .setDescription(`We have successfully deposited <:MursyCoin:970535071528394807>${Number(args[0])}`)
        .addFields(
          {
            name: `Wallet Balance:`, value: `<:MursyCoin:970535071528394807>${Number(walletBalance) - Number(args[0])}`, inline: false
          },
          {
            name: `Bank Balance:`, value: `<:MursyCoin:970535071528394807>${Number(bankBalance) + Number(args[0])}`, inline: false
          }
        )

      message.channel.send({ embeds: [successfulDeposit] })
    }


  }
}


async function getBalance(message, client) {
  const response = await client.db.query(`select balance from balance where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].balance
  return null;
}

async function getBankBalance(message, client) {
  const response = await client.db.query(`select bank from balance where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].bank
  return null;
}
