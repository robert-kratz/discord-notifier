const config = require('../config.json')

module.exports = {
    name: 'play',
    aliases: ['p'],
    syntax: 'join',
    dev: false,
	description: 'The command lets the bot connect to your channel',
	execute(message, args) {
        console.log('work');
		return false;
	},
};