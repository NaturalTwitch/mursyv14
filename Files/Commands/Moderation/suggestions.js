const { EmbedBuilder } = require("discord.js")


module.exports = {
  name: 'suggest',
  aliases: ['suggestion', 'suggestions'],
  description: "Send your Suggestion",
  async execute(client, message, cmd, args, Discord) {
    const author = message.author.username
    const member = message.mentions.members.first();

    let blacklistedUser = await getBlacklist(message, client, member)

    if (!args.length) {
      return message.channel.send("Please Give the Suggestion")
    }

    let suggestionChannel = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${suggestionChannel}`));

    if (message.author.id !== blacklistedUser) {
      if (!channel) {
        return message.channel.send("There is no suggestion channel set")
      }


      let embed = new EmbedBuilder()
        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: `${message.author.avatarURL()}`
        })
        .setTitle(`__Suggestion__`)
        //.setThumbnail(message.author.avatarURL())
        .setColor("#000000")
        .setDescription(args.join(" "))
        .setFooter({ text: (`${message.author.id}`) })
        .setTimestamp()


      channel.send({ embeds: [embed] }).then(m => {
        m.react("✅")
        m.react("❌")
      })

      message.channel.bulkDelete(1)
      message.channel.send(`**${author}**, Your Suggestion was sent to ${channel}`).then(b => {
        setTimeout(() => {
          b.delete()
        }, 10000)
      })

    } else {
      message.channel.send(`Sorry <@${message.author.id}>, But you were blacklisted from Suggestions \`If you feel like this is a mistake talk to your Adminstrator\``)
    }
  }
}

async function getCustomChannel(message, client) {
  const response = await client.db.query(`select channel_id from suggestions where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}

async function getBlacklist(message, client, member) {
  const response = await client.db.query(`select user_id from suggestion_blacklist where guild_id = $1 and user_id = $2`, [message.guild.id, message.author.id])
  if (response && response.rowCount) return response.rows[0].user_id
  return null;
}
