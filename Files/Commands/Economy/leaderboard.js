const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "leaderboard",
  aliases: ['lb'],
  async execute(client, message, cmd, args, Discord) {

    if(args[0] === 'bank'){
    const allRows = await client.db.query(
      `SELECT * FROM balance ORDER BY balance DESC;`
    );
    const sortedRows = allRows.rows.sort((a, b) => b.bank - a.bank);
    const rowsToUse = sortedRows.splice(0, 10);

    let content = `\`Rank | ${spaces('Balance', 10)} | User Tag\`\n`;

    await Promise.all(
      rowsToUse.map((row) => message.client.users.fetch(row.user_id).catch(() => {
        
      }))
    );

    rowsToUse.forEach((row, i) => {
      content += `\`${spaces(`${i+1}.`, 4)} | ${spaces(row.bank, 10)} | ${message.client.users.cache.get(row.user_id).username}\`\n`;
    });

    const leaderEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setTitle("Bank Leaderboard")
      .setDescription(`${content}`)
      .setThumbnail('https://cdn.discordapp.com/emojis/970535071528394807.png?size=80')

    message.channel.send({embeds: [leaderEmbed]});
  } else if (args[0] === 'trivia'){
    const allRows = await client.db.query(
      `SELECT * FROM leaderboard ORDER BY correct_answers DESC;`
    );
    const sortedRows = allRows.rows.sort((a, b) => b.bank - a.bank);
    const rowsToUse = sortedRows.splice(0, 10);

    let content = `\`Rank | ${spaces('Correct Answers', 15)} | User\`\n`;

    await Promise.all(
      rowsToUse.map((row) => message.client.users.fetch(row.user_id).catch(() => {

      }))
    );

    rowsToUse.forEach((row, i) => {
      content += `\`${spaces(`${i+1}.`, 4)} | ${spaces(row.correct_answers, 15)} | ${message.client.users.cache.get(row.user_id).username}\`\n`;
    });

    const leaderEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setTitle("Trivia Leaderboard")
      .setDescription(`${content}`)
      .setThumbnail('https://cdn.mursybot.com/bot_assets/triviatoken.png')

    message.channel.send({embeds: [leaderEmbed]});
  } else if(args[0] === '2048'){
    const allRows = await client.db.query(
      `SELECT * FROM leaderboard ORDER BY highscore DESC;`
    );
    const sortedRows = allRows.rows.sort((a, b) => b.bank - a.bank);
    const rowsToUse = sortedRows.splice(0, 10);

    let content = `\`Rank | ${spaces('High Score', 15)} | User\`\n`;

    await Promise.all(
      rowsToUse.map((row) => message.client.users.fetch(row.user_id).catch(() => {

      }))
    );

    rowsToUse.forEach((row, i) => {
      content += `\`${spaces(`${i+1}.`, 4)} | ${spaces(row.highscore, 15)} | ${message.client.users.cache.get(row.user_id).username}\`\n`;
    });

    const leaderEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setTitle("2048 Leaderboard")
      .setDescription(`${content}`)
      .setThumbnail('https://cdn.mursybot.com/bot_assets/2048.png')

    message.channel.send({embeds: [leaderEmbed]});
  } else {
    message.reply(`Repeat the command with the mention of which leaderboard you want to see [Bank, Trivia, 2048]`)
  }
  },
};

const spaces = (content, numOfSpaces) =>
`${content}${" ".repeat(Math.abs(content.length - numOfSpaces))}`;
