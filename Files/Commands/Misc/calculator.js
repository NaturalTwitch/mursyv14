module.exports = {
  name: 'calculator',
  aliases: ['calc', 'cal'],
  description: "This Does Math",
  async execute(client, message, cmd, args, Discord){

    if(args.length < 3) return message.reply('Please Provide at least two Numbers and an Operation')

    let result = Number(args[0]);

    for(let i = 1; i < args.length; i += 2) {
      const operation = args[i];
      const num = Number(args[i+1]);

      if(!operation || operation < 0) return message.reply('Please Provide a Valid Operation')
      if(isNaN(num)) return message.reply('Please Provide a Valid Number')

      if(operation === '+') result += num;
      else if(operation === '-') result -= num;
      else if(operation === '*') result *= num;
      else if(operation === '/') result /= num;
      else if(operation === '%') result %= num;
      else if(operation === '^') result = Math.pow(result, num);
      else if(operation === 'sqrt') result = Math.sqrt(result);
      else if(operation === 'sin') result = Math.sin(result);
      else if(operation === 'cos') result = Math.cos(result);
      else if(operation === 'tan') result = Math.tan(result);
      else if(operation === 'log') result = Math.log10(result);
      else if(operation === 'ln') result = Math.log(result);
      else return message.reply('Please Provide a Valid Operation')
    }

    message.channel.send(`The Result is ${result}`)
  
  }
}