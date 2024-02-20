const Discord = require('discord.js');
require('dotenv').config();
const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client(process.env.GENUIS_TOKEN);
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'lyrics',
  aliases: ['lyric'],
  description: 'gets the lyrics for a song',
  async execute(client, message, cmd, args, Discord) {

    message.channel.send(`We are currently working on getting a new API key with Genius-Lyrics. Thanks for your patience.`)
    return;

    const noSongEmbed = new EmbedBuilder()
      .setTitle("Can't find song")
      .setDescription("Please provide a valid song name");

    let arguments = args.slice(0).join(' ');
    if (!arguments) return message.channel.send({ embeds: [noSongEmbed] });
    try {
      const songSearch = await GeniusClient.songs.search(`${args}`);
      const topResult = songSearch[0];

      const lyrics = await topResult.lyrics();


      const lyricsEmbed = new EmbedBuilder()
        .setTitle(topResult.fullTitle)
        .setThumbnail(topResult.image)
        .setDescription(lyrics)
        .setColor("#000000")
        .setTimestamp()
      message.channel.send({ embeds: [lyricsEmbed] })
    } catch (err) {

      message.channel.send(`Sorry **${message.author.username}** ${err}`)

    }

    console.log(`[Mursy] Lyric Command was Accessed in ${message.guild.name}`)
  }
}
