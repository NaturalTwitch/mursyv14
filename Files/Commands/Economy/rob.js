const { EmbedBuilder } = require('discord.js');
const userCooldowns = new Map();

module.exports = {
  name: 'rob',
  description: "This is the test command!",
  async execute(client, message, cmd, args, Discord) {
    const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`)
    const protect = await getProtection(message, client, args)


    if (!user) return message.channel.send(`Please ensure you mention who you want to rob!`)

    if (user === message.author) return message.reply(`You cannot rob yourself...`)

    if (user.bot) return message.reply(`Bots cant be robbed!`)


    let yourBalance = await getBalance(message, client)
    if (!yourBalance) {
      yourBalance = '0'
    }

    let otherBalance = await getOtherBalance(message, client, args)
    if (!otherBalance) {
      otherBalance = '0'
    }

    if (Number(otherBalance) < 1) return message.channel.send(`Sorry **${message.author.username}**, But **${user.username}** has no money for you to rob!`)

    if (userCooldowns.has(user)) {
      const cooldownEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription(`Sorry **${message.author.username}**, This person has been robbed already within the last 5 minutes!`)
      message.channel.send({ embeds: [cooldownEmbed] })
      return;
    }
    userCooldowns.set(user);
    setTimeout(() => userCooldowns.delete(user), 300000);

    if (protect === `1`) {
      message.channel.send(`This person has a Wallet Chain, and Felt you grab their Wallet, You got away with <:MursyCoin:970535071528394807>0`)
      await client.db.query(`
          INSERT INTO balance (user_id, protection)
          VALUES ($1, $2)
          ON CONFLICT (user_id)
          DO UPDATE SET protection = $2
      `,
        [user.id, `0`])
      return;
    }





    let amountRobbed = Math.floor((Math.random() * Number(otherBalance)))

    message.channel.send(`<@${message.author.id}> you have successfully stole <:MursyCoin:970535071528394807>${amountRobbed} from **${user.username}**!`)

    await client.db.query(
      `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
      [message.author.id, Number(yourBalance) + Number(amountRobbed)],
    );

    try {
      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [user.id, Number(otherBalance) - Number(amountRobbed)],
      );

      console.log(amountRobbed)
    } catch (err) {

      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [user, Number(otherBalance) - Number(amountRobbed)],
      );
    }
  }
}

async function getBalance(message, client) {
  const response = await client.db.query(`select balance from balance where user_id = $1`, [message.author.id])
  if (response && response.rowCount) return response.rows[0].balance
  return null;
}

async function getProtection(message, client, args) {
  const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`)
  const response = await client.db.query(
    `select protection from balance where user_id = $1`,
    [user.id]
  );
  if (response && response.rowCount) return response.rows[0].protection;
  return null;
}


async function getOtherBalance(message, client, args) {
  const user = message.mentions.users.first() || client.users.cache.get(`${args[0]}`)

  try {
    const response = await client.db.query(`select balance from balance where user_id = $1`, [user.id])
    if (response && response.rowCount) return response.rows[0].balance
    return null;
  } catch (err) {
    const response = await client.db.query(`select balance from balance where user_id = $1`, [user])
    if (response && response.rowCount) return response.rows[0].balance
    return null;
  }
}
