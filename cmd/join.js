const manager = require('../utils/musicmanager')

module.exports = {
    name: 'join',
    aliases: ['j'],
    syntax: 'join',
    dev: false,
	description: 'The command lets the bot connect to your channel',
	async execute(message, args) {
        if(args.length == 0) {
            if(message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                message.reply('Joining **' + message.member.voice.channel.name + '**');
            } else {
                message.reply('You have to be in a voicechannel to execute this command.');
            }
        } else {
            return false;
        }
	},
};