const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'contact',
  description: "This is the test command!",
  async execute(client, message, cmd, args, Discord) {
    if (message.author.id !== '513413045251342336') return;
    const dmUserReply = await getUserCache(message, client, args)


    let userMessage = args.slice(1).join(" ");

    if (!dmUserReply) {
      message.reply(`I couldn't send the message sorry`)
    }
    if (!args[0]) {
      message.channel.send(`You can't send an empty message`)
    }
    if (args[0]) {

      message.channel.send(`Message Was Sent to <@${dmUserReply}>, Message: ${userMessage}`)

      const contactEmbed = new EmbedBuilder()
        .addFields({
          name: 'Message From NaturalTwitch',
          value: `${userMessage}`
        })
        .setTimestamp()


      client.users.cache.get(dmUserReply).send(`${userMessage}`);

      // client.users.cache.get(dmUserReply).send({embeds: [contactEmbed] });
      // let userArgs = Number(args[0])
      // const user = client.users.cache.get(args[0]);
      // user.send(`${userMessage}`)

    }
  }
}



async function getUserCache(message, client, args) {
  try {
    const response = await client.db.query(`select user_id from user_cache where user_id = $1`, [args[0]])
    if (response && response.rowCount) return response.rows[0].user_id
    return null;
  } catch (err) {
    return;
  }

}
