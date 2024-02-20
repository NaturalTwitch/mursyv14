module.exports = {
    name: 'skip',
    aliases: ['next'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(cmd) {
        let client = cmd.client;
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${message.author}, There is no music currently playing! ❌`, ephemeral: true });

        const currentTrack = queue.currentTrack;
        queue.node.skip();

        return cmd.reply({ content: `**${currentTrack.title}**, Skipped song ✅`, ephemeral: true });
    },
};