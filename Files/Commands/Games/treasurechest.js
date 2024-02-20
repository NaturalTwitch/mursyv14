const clc = require('cli-color');
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
  name: 'treasurechest',
  aliases: ['treasure', 'chest'],
  description: 'Code Cracking Game, Winner gets 10000 :MursyCoin:',
  async execute(client, message, cmd, args, Discord) {

    const pin = await getPin(client,message)
    const walletBalance = await getBalance(message, client)
    const attempts = await getAttempts(client, message.guild.id);
    const newAttempts = Math.floor(Number(attempts) + 1);

    const correctResponse = [
      "Hark! The chest has yielded its secrets to you, and your reward is a princely sum of 10,000<:MursyCoin:970535071528394807>!",
      "Well met, brave soul! The chest's enchantments have been vanquished, and within lies a treasure worth 10,000<:MursyCoin:970535071528394807>!",
      "By the dragon's breath, you've unlocked the chest's mysteries! Your reward: a grand sum of 10,000 <:MursyCoin:970535071528394807>",
      "Marry, you've bested the chest's defenses! Your prize, noble adventurer, is a fortune of 10,000<:MursyCoin:970535071528394807>!",
      "In the name of chivalry, you've conquered the chest's riddles! Your bounty: a treasure chest brimming with 10,000<:MursyCoin:970535071528394807>!",
      "Huzzah! The chest's secrets are now yours to behold. Your reward: 10,000<:MursyCoin:970535071528394807>",
      "Thou hast shown great valor, for the chest's lock is broken, and within awaits 10,000<:MursyCoin:970535071528394807> as thy reward!",
      "By the grace of the fates, the chest now opens to thee, and thy prize is a handsome purse of 10,000<:MursyCoin:970535071528394807>!",
      "Well done, gallant adventurer! The chest's spell is shattered, and you shall find 10,000<:MursyCoin:970535071528394807> as your spoils!",
      "Ye have proven thy mettle, and the chest's secrets are revealed. A treasure of 10,000<:MursyCoin:970535071528394807> awaits thee!"
    ]

    const incorrectResponse = [
      "Methinks thou hast erred! The castle gate remains barred, for the PIN is not of the correct enchantment.",
      "Alas, brave traveler, thy attempt to unlock the chest hath failed! The PIN thou hast entered is not in accord with the ancient incantations.",
      "Oh, valiant one, the drawbridge doth not lower, for the PIN thou hast uttered is not of the secret scrolls.",
      "By the mystic runes, it seems thou art not yet privy to the correct PIN, and thus the enchanted door shall remain sealed.",
      "Nay, good sir or lady, the PIN thou hast tried doth not unseal the wizard's spell. Seek ye the right incantation.",
      "Verily, the treasure remains concealed, for the PIN thou hast employed is not of the knightly order.",
      "In the name of the olden codes, the gate remains shut, for the PIN thou hast attempted is not part of the ancient script.",
      "Hark! The portal resists your command, for the PIN entered is not of the rightful lineage.",
      "By the enchanted words of yore, the door refuses to yield, for the PIN thou hast used is not of the mystical decree.",
      "A missive from the past, the PIN doth not match, and thus the chamber's secrets remain locked."
    ]

    let congrats = Math.floor((Math.random() * correctResponse.length))

    let boo = Math.floor((Math.random() * incorrectResponse.length))

    


    function generateRandomPIN() {
      // Generate a random number between 0 and 999 (inclusive)
      const randomNum = Math.floor(Math.random() * 1000);
      
      // Ensure the number is exactly 3 digits long
      const pin = String(randomNum).padStart(3, '0');
      
      return pin;
    }
    
    const randomPIN = generateRandomPIN();

    if(!args[0] || args[0] === NaN){
      message.channel.send(`You can't unlock this chest without a PIN / The PIN is Numeric ** 3 Digits **`)
      return;
    }
    
   if(args[0] === pin){
    message.channel.send(correctResponse[congrats])
    message.channel.send(`It took ${attempts} Attempts to get the correct pin!`)
    await client.db.query(
      `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
      [message.author.id, 10000 + Number(walletBalance)]
    );
    await client.db.query(
      `UPDATE pin SET attempts = 0 WHERE guild_id = $1;`,
      [client.user.username]
    );
    await client.db.query(
      `INSERT INTO pin (pincode, guild_id) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET pincode = $1;`,
      [randomPIN, client.user.username],
    );
    message.channel.send(`The PIN has changed, Test your code cracking skills again. Good Luck!`)
   } else {
    message.channel.send(incorrectResponse[boo])
    await client.db.query(
      `INSERT INTO pin (guild_id, attempts) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET attempts = $2;`,
      [client.user.username, newAttempts],
    );
   }
  },
};
async function getAttempts(client) {
  const response = await client.db.query(
    `SELECT attempts FROM pin WHERE guild_id = $1`,
    [client.user.username]
  );
  if (response && response.rowCount) return response.rows[0].attempts;
  return null;  
}

async function getPin(client, message) {
     const response = await client.db.query(
    `select pincode from pin where guild_id = $1`,
    [client.user.username]);
    if (response && response.rowCount) return response.rows[0].pincode;
    return null;  
}

async function getBalance(message, client) {
  const response = await client.db.query(
    `select balance from balance where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].balance;
  return null;
}