const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
    name: 'embedbuilder',
    description: 'Posts a custom embed for a user',
    async execute(client, message, cmd, args, Discord){
        
        if(!args) return message.channel.send(`You require an argument.`)
        if(!message.guild.members.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`You don't have the right permissions for this (Manage Server)`)
        
        const postEmbed = new EmbedBuilder()
        .setTitle(`${args[0]}`)
    
        
    }
}