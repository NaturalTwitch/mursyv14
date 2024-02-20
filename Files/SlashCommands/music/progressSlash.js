const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const errorLog = require('/root/discord/mursy/Files/Modules/errorlog.js');


module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(cmd) {
        let client = cmd.client;

        try {
            const queue = client.player.nodes.get(cmd.guild.id);


            if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${cmd.author}, There is no music currently playing!`, ephemeral: true });

            const progress = queue.node.createProgressBar();;


            const currentTimestamp = queue.node.getTimestamp().current.value;

            const track = queue.currentTrack;

            if (currentTimestamp == 'Infinity') return cmd.reply({ content: `This song is live streaming, no duration data to display. 🎧`, ephemeral: true });

            const progressEmbed = new EmbedBuilder()
                .setColor(`000000`)
                .setTitle(`${track.title}`)
                .setImage(`${track.thumbnail}`)
                .setDescription(`${progress}`)

            cmd.reply({ embeds: [progressEmbed], ephemeral: true });
        } catch (e) {
            console.log(e);
            errorLog(e)
            return

        }
    },
};
