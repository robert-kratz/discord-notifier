const config = require('../config.json')

module.exports = {
    name: 'version',
    aliases: ['version', 'v'],
    syntax: 'version',
    dev: false,
	description: 'The command shows the current version of the bot',
	execute(message, args) {
		message.channel.send('Project version ' + config.version + ' running on ' + process.platform);
	},
};