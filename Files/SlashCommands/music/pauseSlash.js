module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(cmd) {
        
        let client = cmd.client;
        const queue = client.player.nodes.get(cmd.guild.id);

        if (!queue || !queue.node.isPlaying()) return cmd.reply({ content: `${message.author}, There is no music currently playing!. ❌`, ephemeral: true});

        const success = queue.node.pause();

        return cmd.reply({content: success? `The currently playing music named **${queue.currentTrack.title}** has stopped ✅` : `${message.author}, Something went wrong. ❌`, ephemeral: true});
},
};