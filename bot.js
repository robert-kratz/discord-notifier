"use strict";

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Discord.Client();

//COMMAND HANDLING

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./cmd/${file}`);
    if(command.aliases === undefined) {
        console.log('Could not load command ' + file + ', please check syntax');
    } else {
        command.aliases.forEach(element => {
            client.commands.set(element, command);
        });
    }
}

//EVENT HANDLING

client.on('message', message => {
    
    if(message.channel.type === 'dm') return;

    //MESSAGE HANDLER

    if(require('./blacklist.json').words.forEach(world => {
        if(message.content.includes(world) && !message.member.roles.cache.some(role => role.name === 'root') && message.member) {
            message.delete({ timeout: 10 });
            message.author.send(new Discord.MessageEmbed()
            .setColor('#000000')
            .addField('Your message has been auto deleted:', message.content, true)
            .setTimestamp());
        }
    }));

    //COMMAND HANDLER

    if(!message.content.startsWith('!') || message.author.bot) return;

	const args = message.content.slice('!'.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)) return;

	try {
        //if(config.admins.find(admin => admin === message.member.id) != undefined) return;
		var state = client.commands.get(command).execute(message, args);
        if(!state) message.reply('Syntax error: `!' + client.commands.get(command).syntax + '`');
	} catch (error) {
		console.error(error);
		message.reply('There seems to be a problem with the bot, please contact the support to fix the issiue.');
	}
});

client.on('guildMemberAdd', (guildMember) => {
    require(`./event/memberjoin`).execute(guildMember);
 });

client.on('ready', (e) => {
    console.log('Logged in as ' + client.user.tag);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    const newUserChannel = newMember.member.voice.channelID, oldUserChannel = oldMember.member.voice.channelID;

    if((!newMember.channel && oldMember.channel) || newMember.channel && oldMember.channel) {
        require('./event/voicechannelleave').execute(oldMember);
    }
    if((newMember.channel && !oldMember.channel) || (newMember.channel && oldMember.channel)) {
        require('./event/voicechanneljoin').execute(oldMember, newMember);
    }
});

client.on("disconnect", (e) => {
    console.log('Bot Disconnected.');
});

const start = (token) => {
    client.login(token).then(() => {
        client.user.setPresence({ 
            activity: { 
                name: 'notifier.exe',
                type: 'LISTENING',
                url: 'https://notifier.rjks.us/me'
            }, 
            status: 'idle'
        }).catch(console.error);
    }).catch(console.error);
}

const stop = () => {
    client.destroy();
}

start(process.env.token);

module.exports = {
    Discord,
    client,
    start,
    stop
}
