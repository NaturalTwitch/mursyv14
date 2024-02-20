module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(cmd) {
        let client = cmd.client
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue) return cmd.reply({ content: `${message.author}, There is no music currently playing!. ❌`, ephemeral: true });

        const success = queue.node.resume();

        return cmd.reply({ content: success ? `**${queue.currentTrack.title}**, The song continues to play. ✅` : `${message.author}, Something went wrong. ❌`, ephemeral: true });
    },
};