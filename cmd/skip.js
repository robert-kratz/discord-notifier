const config = require('../config.json')

module.exports = {
    name: 'skip',
    aliases: ['s'],
    syntax: 'join',
    dev: false,
	description: 'The command lets the bot connect to your channel',
	execute(message, args) {
		return false;
	},
};