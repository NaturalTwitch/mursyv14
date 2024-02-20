const Discord = require('discord.js');
const currentDate = new Date()
const errorLog = require('../Modules/errorlog.js');



module.exports = {
  execute(cmd) {
    commandHandler(cmd);
  },
};

const commandHandler = (cmd) => {
  let author = cmd.user.tag
  if (!cmd.isCommand()) return;
  const command = cmd.client.slashCommands.get(cmd.commandName);
  if (!command) return;

  try{
  command.execute(cmd);
  } catch (err) {
    errorLog(err)
  }
};
