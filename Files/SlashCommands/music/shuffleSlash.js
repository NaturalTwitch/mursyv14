module.exports = {
    name: 'shuffle',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(cmd) {
        let client = cmd.client
        const queue = client.player.nodes.get(message.guild.id);

        queue.tracks.shuffle();

        cmd.reply({ content: `Shuffling Music...`, ephemeral: true })

    },
}