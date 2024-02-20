module.exports = {
    name: 'queueclear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(cmd) {
        let client = cmd.client;
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${message.author}, No music currently playing. ❌`, ephemeral: true });

        // if (!queue.tracks[0]) return cmd.reply({ name: `${message.author}, There is already no music in queue after the current one ❌`);

        await queue.tracks.clear();

        cmd.reply({ content: `The queue has just been cleared. 🗑️`, ephemeral: true });
    },
};
