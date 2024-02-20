module.exports = (client) => {
  const clc = require('cli-color');
  const currentDate = new Date()

  const Guilds = client.guilds.cache.map(guild => guild.name);
 //20 Characters
  let loadingBar = "Logging in";
  let index = 0;
  let timeoutId;

  function animateLoading() {
    console.clear();
    console.log(clc.blue(loadingBar.substring(0, index)));
    index++;
    if (index > loadingBar.length) {
      index = 0;
    }
    timeoutId = setTimeout(animateLoading, 1000);
  }

   animateLoading();

  // Stop the loading animation after 5000 milliseconds
  setTimeout(() => {
    console.clear();
    clearTimeout(timeoutId);
    setTimeout(() => {
    console.log(`[${currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })}][Mursy Systems] Logged in`);
    setTimeout(function () {
      console.clear();
      console.log(`[${currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })}][Mursy Systems]`, Guilds)
      console.log(`[${currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })}][Mursy Systems] Currently on` + clc.magenta(` ${client.guilds.cache.size} `) + `Servers`)
    }, 2000)
    }, 1000);
  }, 11000);
  
}
