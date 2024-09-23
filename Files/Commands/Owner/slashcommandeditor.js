const { EmbedBuilder } = require("discord.js");
const canvacord = require("canvacord");
const { time } = require("console");
const { description } = require("../Settings/setXpSystem");

module.exports = {
  name: "scedit",
  description: "Test Commands",
  async execute(client, message, cmd, args, Discord) {

    if(message.author.id !== '513413045251342336') return;

    const newCommand = {
      name: "minecraftserverstatus",
      description: "Get the status of a minecraft server",
      options: [
        {
          name: "ip",
          description: "What is the IP Address of the server you want to view?",
          required: true,
          type: 3,
        }
        // {
        //   name: "color",
        //   description: "Select a color using HEXCODE `FFFFFF`",
        //   required: false,
        //   type: 3, // String
        // },
        // {
        //   name: "title",
        //   description: "Set Title of the embed",
        //   required: false,
        //   type: 3, // String
        // },
        // {
        //   name: "image",
        //   description: "adds an image to the embed",
        //   required: false,
        //   type: 3, // String
        // },
        // {
        //   name: "description",
        //   description: "Sets Embed Description",
        //   required: false,
        //   type: 3, // String
        // },
        // {
        //   name: "footer",
        //   description: "Set footer of the embed",
        //   required: false,
        //   type: 3, // String
        // },
      ],
      default_permission: undefined,
    };

    
        // Recreate the command with updated options
        

        // Register the new command
        client.application.commands.create(newCommand);
        message.channel.send(`Successfully Edited the Slash Command`)
      // })
      // .catch(console.error);
  },
};
