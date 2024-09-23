const { EmbedBuilder } = require('discord.js');
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
    name: 'queue',
    utilisation: '{prefix}queue',
    voiceChannel: true,

    async execute(cmd) {
        console.log('Hiii!!!')
        let client = cmd.client;
        try {
            const queue = client.player.nodes.get(cmd.guild.id);


            if (!queue || !queue.node.isPlaying()) return cmd.reply(`${cmd.author}, There is no music currently playing!. ❌`);

            if (!queue.tracks) return cmd.reply(`${cmd.author}, No music in queue after current. ❌`);

            const embed = new EmbedBuilder();
            const methods = ['🔁', '🔂'];

            //embed.setColor('RED');
            embed.setThumbnail(cmd.guild.iconURL({ size: 2048, dynamic: true }));
            embed.setTitle(`Server Music List - ${cmd.guild.name}`);

            const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track.requestedBy.id}>)`);

            const songs = queue.tracks.size;
            const nextSongs = songs > 5 ? `And **${songs - 5}** Other Song...` : `There are **${songs}** Songs in the List.`;

            embed.setDescription(`Currently Playing: \`${queue.currentTrack.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

            embed.setTimestamp();
            embed.setFooter({ text: `requested by: ${cmd.author}` });

            cmd.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
            errorLog(e);
            return;

        }
    },
};