const { QueueRepeatMode } = require('discord-player');
const Discord = require('discord.js');
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
    name: 'loop',
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    async execute(cmd) {
        let client = cmd.client;
        const song = cmd.options.getString('type');
        

        let loopToggle = await getLoopToggle(cmd, client);

        if (!loopToggle) {
            loopToggle = false;
        }

        try {
            const queue = client.player.nodes.get(cmd.guild.id);

            if (!queue || !queue.node.isPlaying()) {
                return cmd.reply({ content: `${cmd.author}, There is no music currently playing! ❌` });
            }

            if (!loopToggle || loopToggle === 'false') {
                await client.db.query(`INSERT INTO loop_toggle (guild_id, toggled) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET toggled = EXCLUDED.toggled WHERE loop_toggle.toggled <> EXCLUDED.toggled`, [cmd.guild.id, 'true']);
            } else if (loopToggle === 'true') {
                await client.db.query(`INSERT INTO loop_toggle (guild_id, toggled) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET toggled = EXCLUDED.toggled WHERE loop_toggle.toggled <> EXCLUDED.toggled`, [cmd.guild.id, 'false']);
            }

            if (song === 'queue') {
                console.log('queue')
                if (queue.repeatMode === 1) {
                    return cmd.reply({ content: `${cmd.author}, You should disable loop mode of existing music first **(${client.config.px}loop)** ❌` });
                }
                await queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
                cmd.reply({ content: loopToggle ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, The whole sequence will repeat non-stop 🔁` : `${cmd.author}, Something went wrong. ❌` });
                return;
            } else if ('single') {
                console.log('single')
                if (queue.repeatMode === 2) {
                    return cmd.reply({ content: `${cmd.author}, In Loop mode you must disable existing queue first **(${client.config.px}loop queue)** ❌` });
                }
                await queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
                cmd.reply({ content: loopToggle ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Current music will be repeated non-stop (all music in the list **${client.config.px}loop queue**  You can repeat it with the option.) 🔂` : `${cmd.author}, Something went wrong. ❌` });
                return;
            }
        } catch (e) {
            errorLog(e);
            console.log(e);
            return cmd.reply({ content: `${cmd.author}, An error occurred while attempting to change the loop mode. ❌` });
        }
    },
};

async function getLoopToggle(cmd, client) {
    const response = await client.db.query(`SELECT toggled FROM loop_toggle WHERE guild_id = $1`, [cmd.guild.id]);
    if (response && response.rowCount) return response.rows[0].toggled;
    return null;
}
