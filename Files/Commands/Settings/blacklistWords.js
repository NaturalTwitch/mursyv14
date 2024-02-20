const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
  name: "blacklistword",
  description: "Blacklists a word for that server",
  async execute(client, message, cmd, args, Discord) {
    // if (message.author.id !== "513413045251342336") return;

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      return message.channel.send(`Not Enough Permissions to Execute Command`);
    }
    let text = `${args[0]?.toLowerCase()}`;
    let blacklistedWords = await getBlacklist(message);

    if (!args[0]) {
      message.channel.send(`The Current blacklisted words are ||[${blacklistedWords}]||`)
      return;
    }

    console.log(blacklistedWords)

    if (text) {
      if (args[1]?.toLowerCase() === "remove") {
        if (
          blacklistedWords &&
          blacklistedWords.includes(args[0]?.toLowerCase())
        ) {
          client.db.query(
            `UPDATE blacklisted_words SET blacklisted_word = array_remove(blacklisted_word, $2) WHERE guild_id = $1;`,
            [message.guild.id, text]
          );
          message.channel.send(
            `**${args[0]}** was removed from blacklisted words`
          );
        } else {
          message.channel.send(`**${args[0]}** is not a blacklisted word`);
        }
        return;
      }

      if (blacklistedWords) {
        if (blacklistedWords === args[0]?.toLowerCase()) {
          message.reply(`${args[0]} is already blacklisted`)
          return;
        }
        client.db.query(
          `UPDATE blacklisted_words SET blacklisted_word = array_append(blacklisted_word, $2) WHERE guild_id = $1;`,
          [message.guild.id, text]
        );
      } else {
        client.db.query(
          `INSERT INTO blacklisted_words (blacklisted_word, guild_id) VALUES ($1, $2);`,
          [[text], message.guild.id]
        );
      }
      message.channel.send(`**${args[0]}** was added to blacklisted words`);
    } else {
      // message.channel.send("Please add the word you would like to blacklist");
    }
  },
};

async function getBlacklist(message) {
  const response = await message.client.db.query(
    `select blacklisted_word from blacklisted_words where guild_id = $1;`,
    [message.guild.id]
  );
  if (response && response.rowCount) return response.rows[0].blacklisted_word;
  return null;
}
