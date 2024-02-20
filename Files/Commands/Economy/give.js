const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'give',
  description: "This is the test command!",
async execute(client, message, cmd, args, Discord){

  const user = message.mentions.users.first()


  if(!user) return message.channel.send(`Please ensure you mention someone`)
  if(user.id === message.author.id) return message.reply(`You can't give yourself money!`)

let yourBalance = await getBalance(message, client)

let otherBalance = await getOtherBalance(message, client)

const giveAmount = Number(args[1])


if(giveAmount < 1) return message.channel.send('We cannot give a negative balance')

if(!giveAmount){
  message.channel.send(`Please ensure you give a real number`)
  return;
}

if(giveAmount > yourBalance){
  message.channel.send(`You cannot give this much try a lower amount`)
  return;
}

if(yourBalance < 1) return message.channel.send(`You don't have any money to give`)

await client.db.query(
      `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
      [message.author.id, Number(yourBalance) - giveAmount],
    );

    await client.db.query(
          `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
          [user.id, Number(otherBalance) + giveAmount],
        );

message.channel.send(`Giving ${user.username}, <:MursyCoin:970535071528394807>${giveAmount}`)


  }
}

async function getBalance(message, client){
const response = await client.db.query(`select balance from balance where user_id = $1`, [message.author.id])
if(response && response.rowCount) return response.rows[0].balance
return null;
}

async function getOtherBalance(message, client){
  const user = message.mentions.users.first()
const response = await client.db.query(`select balance from balance where user_id = $1`, [user.id])
if(response && response.rowCount) return response.rows[0].balance
return null;
}
