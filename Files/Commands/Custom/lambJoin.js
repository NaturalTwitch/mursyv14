module.exports = {
  name: 'join',
  description: 'Join a channel',
    execute(client, message, cmd, args, Discord){
      if(message.guild.id === '885599190162493470' || message.guild.id === '885963428785700884'){
        //  let checkChannel = message.mentions.channels.first().id;
        let channels = message.guild.channels.cache.find((x) => (x.name === `${args[0]}`) || (x.id === `${args[0]}`));
    //      let channels = message.mentions.channels.first();
    //     let channel = channels.filter((c) => c.isText()).first()

        if(channels){
          channels.permissionOverwrites.create(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
          });
          channels.send(`<@${message.author.id}> welcome to ${channels}`)
          message.reply(`Joining ${channels}`)
         setTimeout(function(){
           message.channel.bulkDelete(2)
         },200)
        } else {
          message.channel.send('Please mention a channel or course number, follow instructions in  <#937881465386045510>')
        }

      } else {
        return
      }
    }
}
