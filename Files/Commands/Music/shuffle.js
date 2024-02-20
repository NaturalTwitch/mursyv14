module.exports = {
    name: 'shuffle',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message, cmd, args, Discord) {
        const queue = client.player.nodes.get(message.guild.id);

        queue.tracks.shuffle();

        message.channel.send(`Shuffling Music...`)

    },
}