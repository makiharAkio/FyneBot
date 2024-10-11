const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('../../config.json');
require('dotenv').config();

let token = process.env.TOKEN;
let cmdId = '1145471712582979614';

const rest = new REST({ version: '9' }).setToken(token);

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, cmdId))
	.then(() => console.log('Successfully deleted guild command'))
	// .catch(console.error);
	.catch(console.log('Failed to delete guild command'));

// for global commands
rest.delete(Routes.applicationCommand(clientId, cmdId))
	.then(() => console.log('Successfully deleted application command'))
	// .catch(console.error);
	.catch(console.log('Failed to delete application command'));