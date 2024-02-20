module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(cmd) {
        let client = cmd.client;
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${cmd.user}, There is no music currently playing!`, ephemeral: true });

        queue.delete();

        cmd.reply(`Stopping playback and clearing queue`);
    },
};
