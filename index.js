require('dotenv').config();
// const { Client, GatewayIntentBits } = require("discord.js");
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require('mongoose');
//const eventHandler = require('./src/handlers/eventHandler');
const { CommandHandler } = require('djs-commander');
const path = require('path');

// const client = new Client({ 
//     intents: [
//         GatewayIntentBits.Guilds, 
//         GatewayIntentBits.GuildMembers, 
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.GuildPresences,
//         GatewayIntentBits.MessageContent
//     ] 
// });

const client = new Client({ intents: [ IntentsBitField.Flags.Guilds] });

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'src/commands'),
  eventsPath: path.join(__dirname, 'src/events'),
  testServer: '1140998358790582314', // This ensures your commands are guild-based
});

(async () => {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to DB.');
  
      //eventHandler(client);
  
      client.login(process.env.TOKEN);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  })();