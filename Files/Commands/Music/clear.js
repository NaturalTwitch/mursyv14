module.exports = {
    name: 'queueclear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message, cmd, args, Discord) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`${message.author}, No music currently playing. ❌`);

       // if (!queue.tracks[0]) return message.channel.send(`${message.author}, There is already no music in queue after the current one ❌`);

        await queue.tracks.clear();

        message.channel.send(`The queue has just been cleared. 🗑️`);
    },
};
