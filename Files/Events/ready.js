const { AutoPoster } = require('topgg-autoposter')
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const ms = require('ms')
const moment = require('moment');
require('moment-duration-format');
//extra functions
const levels = require('../Client/level.js')
const startup = require('./StartUp.js')
const birthday = require('../Client/birthdayMessage.js')
const clc = require('cli-color')

module.exports = {
  once: true,
  async execute(client, message, cmd, args, Discord) {

    const currentDate = new Date()

    console.log(`[${currentDate.toLocaleString()}][Mursy Systems] Mursy System Activated!`);
    const Guilds = client.guilds.cache.map(guild => guild.name);

    // try {
    //   startup(client)
    // } catch (err) {
    //   console.log(clc.red(err))
    // }

  //   setTimeout(function () {
  //   try {
  //     birthday(message, client)
  //   } catch (err) {
  //     console.log(clc.red(err))
  //   }
  // }, 20000)

    if (client.user.id === '1085594094794985675') {

      let channel = client.channels.cache.find((x) => (x.id === '934287269228081172'));

      setInterval(function () {
        channel.setName(`Currently ${client.guilds.cache.size} Servers`)
      }, 300000)


      // try{
      //   console.log(`[${currentDate.toLocaleString()}][Mursy Systems] Level System Activated`)
      //   levels(client)
      // } catch (err) {
      //   console.log(err)
      // }
    } // else if(client.user.id === '896851658464722995'){
    //   console.log(`[${currentDate.toLocaleString()}][Mursy Systems] Level System is not enabled on this bot!`)
    // }


    let runtime = moment
      .duration(client.uptime)
      .format(`y [Years], M [Months], W [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`)

    console.log(`[${currentDate.toLocaleString()}][Mursy Systems]` + clc.green(` Current ping is [null]ms....`))
    console.log(`[${currentDate.toLocaleString()}][Mursy Systems] Current Runtime is ${runtime}....`)

    setInterval(function () {
      const dateTime = new Date()
      console.log(`[${dateTime.toLocaleString()}][Mursy Systems] Current ping is ${Math.round(client.ws.ping)}ms....`)
    }, 1200000)

    setInterval(function () {
      const dateTime = new Date()
      let runtime = moment
        .duration(client.uptime)
        .format(`y [Years], M [Months], W [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`)


      console.log(`[${dateTime.toLocaleString()}][Mursy Systems] Current Runtime is` + clc.green(`${runtime}....`))
    }, 1800000)
  }
}
