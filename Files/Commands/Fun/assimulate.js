const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "assimilate",
  description: "assimulate another user",
  execute(client, message, cmd, args, Discord) {
    let member = message.author.username;
    let user = message.mentions.users.first();

    if (!user)
      return message.channel.send(`**${member}**, Please Mention a User!`);

    let death = [
      "https://nerdist.com/wp-content/uploads/2019/08/giphy-1.gif",
      "https://external-preview.redd.it/ca59jG4q6eipXY9514ExHn99qNgXn6qinY99W0rgxZQ.jpg?auto=webp&s=e2b08a9e8201a9c37d125e16095ad66bf24616b2",
      "https://www.mutuallyhuman.com/wp-content/uploads/2018/05/you_will_be_assimilated-6e5cb71e421efccd6cead57aefe2415b40bac3317fb9156b10737ad469f517e5.jpg",
      "https://pbs.twimg.com/media/FO5SYTKWQAI72hx.jpg:large",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9yCkogP2wQJTUif1sXaseVOK4bvG0V865A&usqp=CAU",
    ];

    //let replies =[

    //]
    let image = Math.floor(Math.random() * death.length + 1);

    //let result = Math.floor((Math.random() * replies.length))

    let killEmbed = new EmbedBuilder()
      .setColor("#00ff00")
      .setThumbnail(death[image])
      .setDescription(`${member} Assimilated ${args}`);

    message.channel.send({ embeds: [killEmbed] });
    console.log(image);

    setTimeout(function () {
      message.channel.send("We Are The Borg!");
    }, 2000);

    setTimeout(function () {
      message.channel.send("Prepare To Be Assimilated!");
    }, 3000);

    setTimeout(function () {
      message.channel.send("Resistance is Futile!");
    }, 4000);
  },
};
