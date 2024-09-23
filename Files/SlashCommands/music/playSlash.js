const { SlashCommandBuilder } = require('@discordjs/builders');
const { useMainPlayer } = require('discord-player');
const { QueryType } = require('discord-player');
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
    name: 'play',
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true, // The option for the song name

    async execute(cmd) {
        const song = cmd.options.getString('song'); // Get the song string from the cmd options

        if (!song) return cmd.reply({ content: `${cmd.user}, Write the name of the music you want to search. ❌`, ephemeral: true });

        const player = useMainPlayer();
        const voiceChannel = cmd.member.voice.channel;
        if (!voiceChannel) return cmd.reply({ content: `${cmd.user}, You are not connected to a voice channel. ❌`, ephemeral: true });

        const searchResult = await player.search(song, {
            requestedBy: cmd.user,
            searchEngine: QueryType.AUTO
        });

        if (!searchResult.hasTracks()) return cmd.reply({ content: `${cmd.user}, No results found! ❌`, ephemeral: true });

        try {
            await player.play(voiceChannel, searchResult, {
                nodeOptions: {
                    metadata: {
                        channel: cmd.channel,
                        client: cmd.guild.members.me,
                        requestedBy: cmd.user,
                        guildId: cmd.guild.id
                    }
                }
            });
            cmd.reply({ content: `Added ${song} to queue`, ephemeral: true })
        } catch (error) {
            console.error(error);
            console.log(searchResult);
            errorLog(error);
            cmd.reply({ content: `${cmd.user}, An error occurred while playing the track. ❌`, ephemeral: true });
        }
    },
};
