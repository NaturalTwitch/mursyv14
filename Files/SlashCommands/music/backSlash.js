module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(cmd) {
        let client = cmd.client;
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${message.author}, There is no music currently playing! ❌`, ephemeral: true });

        // const previousTracks = queue.history.toArray();
        // if (previousTracks.length < 2) return cmd.reply({ name: `\${message.author}, There was no music playing before ❌`);

        await queue.history.back();

        cmd.reply({ content: `Previous music started playing... ✅`, ephemeral: true });
    },
};