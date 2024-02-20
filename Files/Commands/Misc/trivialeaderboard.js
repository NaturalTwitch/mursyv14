const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "trivialeaderboard",
  aliases: ['tlb', 'tleaderboard'],
  async execute(client, message, cmd, args, Discord) {
    const allRows = await client.db.query(
      `SELECT * FROM trivia_leaderboard ORDER BY correct_answers ASC;`
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
  },
};

const spaces = (content, numOfSpaces) =>
`${content}${" ".repeat(Math.abs(content.length - numOfSpaces))}`;
