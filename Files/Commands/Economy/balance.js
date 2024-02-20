const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'balance',
  aliases: ['bal'],
  description: "Check your balance",
  async execute(client, message, cmd, args, Discord) {

    const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || message.author;

    var balance = await getBalance(message, client, args);
    if (!balance) {
      balance = '0'
    }
    var bank = await getBankBalance(message, client, args);
    if (!bank) {
      bank = '0'
    }


    const balEmbed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * (0xffffff + 1)))
      .setTitle(`${user.username}'s Balance`)
      .setThumbnail(`${user.displayAvatarURL()}`)
      .addFields(
        {
          name: `Wallet Balance:`, value: `${mursyCoin}${balance}`, inline: false
        },
        {
          name: `Bank Balance:`, value: `${mursyCoin}${bank}`, inline: false
        }
      )
    message.channel.send({ embeds: [balEmbed] })

  }
}

async function getBalance(message, client, args) {
  const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || message.author;
  const response = await client.db.query(`select balance from balance where user_id = $1`, [user.id])
  if (response && response.rowCount) return response.rows[0].balance
  return null;
}

async function getBankBalance(message, client, args) {
  const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`) || message.author
  const response = await client.db.query(`select bank from balance where user_id = $1`, [user.id])
  if (response && response.rowCount) return response.rows[0].bank
  return null;
}
