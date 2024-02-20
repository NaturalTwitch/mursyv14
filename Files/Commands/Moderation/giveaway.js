const ms = require('ms');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'giveaway',
  description: 'start a giveaway',
  async execute(client, message, cmd, args, Discord) {
    message.delete();

    let author = message.author.username;
    let creator = message.author.id;
    var title = "";
    var time;
    for (var i = 1; i < args.length; i++) {
      title += (args[i] + " ");
    }
    const errorEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle(`Giveaway 🎉`)
      .setDescription(`Invalid Duration Provided`)
      .addFields({ name: 'Example:', value: '`.giveaway <time s/h/d/y> <Item>`' })

    time = args[0];
    if (!time) {
      return message.channel.send({ embeds: [errorEmbed] })
    }
    if (!title) {
      title = "No title"
    }

    if (!ms(time)) {
      return message.channel.send({ embeds: [errorEmbed] })
    }

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      message.channel.send(`Sorry **${author}** But you don't have enough permissions to use this command!`)
    } else {
      if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        let giveawayEmbed = new EmbedBuilder()
          .setColor('#000000')
          .setThumbnail(`${message.author.displayAvatarURL()}`)
          .setTitle(`${author}'s Giveaway 🎉`)
          .addFields(
            {
              name: `Prize:`,
              value: `${title}`
            },
            {
              name: `Duration :`,
              value: ms(ms(time), {
                long: true
              }),
              inline: true
            }
          )
          .setFooter({ text: "React to this message with 🎉 to participate ! Ends" })
          .setTimestamp(Date.now() + ms(time))



        var giveawaySent = await message.channel.send({ embeds: [giveawayEmbed] });
        giveawaySent.react('🎉');




        setTimeout(async function () {

          var react = await giveawaySent.reactions.cache.find(r => r.emoji.name === '🎉').users.fetch();
          react = react.filter(u => u.id !== '896851658464722995')
          const reactArray = react.map(c => c)
          let index = Math.floor(Math.random() * reactArray.length);
          let winner = reactArray[index];

          console.log(reactArray)
          console.log(index)
          console.log(winner)

          if (!winner) {
            let noWinnerEmbed = new EmbedBuilder()
              .setColor('#ff0000')
              .setTitle(`${author}'s Giveaway 🎉`)
              .setDescription(`Unfortantely no one reacted to This giveaway so there we're no winners`)
              .addFields({ name: `Giveaway For:`, value: `${title}` })
              .setFooter({ text: `Ended` })
              .setTimestamp()
            message.channel.send({ embeds: [noWinnerEmbed] })
          } else {

            let winnerEmbed = new EmbedBuilder()
              .setColor('#00ff00')
              .setTitle(`**Congratulations 🎉**`)
              .setDescription(`Winner is ${winner}`)
              .addFields({ name: `You Won :`, value: `${title}` })
              .setFooter({ text: `Ended` })
              .setTimestamp()
            message.channel.send(`<@${creator}> The Winner Has been Drawn!`)
            message.channel.send({ embeds: [winnerEmbed] })
          }
        }, ms(time))
      }

    }

  }
}
