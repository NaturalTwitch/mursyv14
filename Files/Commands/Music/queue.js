const { EmbedBuilder } = require('discord.js');
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message, cmd, args, Discord) {
        try {
            const queue = client.player.nodes.get(message.guild.id);


            if (!queue || !queue.node.isPlaying()) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

            if (!queue.tracks) return message.channel.send(`${message.author}, No music in queue after current. ❌`);

            const embed = new EmbedBuilder();
            const methods = ['🔁', '🔂'];

            //embed.setColor('RED');
            embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
            embed.setTitle(`Server Music List - ${message.guild.name}`);

            const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track.requestedBy.id}>)`);

            const songs = queue.tracks.size;
            const nextSongs = songs > 5 ? `And **${songs - 5}** Other Song...` : `There are **${songs}** Songs in the List.`;

            embed.setDescription(`Currently Playing: \`${queue.currentTrack.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

            embed.setTimestamp();
            embed.setFooter({ text: `requested by: ${message.author.tag}` });

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
            errorLog(e);
            return;

        }
    },
};