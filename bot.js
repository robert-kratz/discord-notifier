"use strict";

const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', (e) => {
    console.log('Logged in as ' + client.user.tag);
});

client.on("disconnect", (e) => {
    console.log('Bot Disconnected.');
});

client.on('message', (e) => {
    if(e.content === '-version') {
        e.reply('Project version ' + config.version + ' running on ' + process.platform);
    } else if(e.content === '-stop' && e.author.id === '247755197051437057') {
        client.destroy;
    }
});

const start = (token) => {
    client.login(token).then(() => {
        client.user.setPresence({ 
            activity: { 
                name: 'notifier.exe',
                type: 'LISTENING',
                url: 'https://notifier.rjkstudios.com/me'
            }, 
            status: 'idle'
        }).catch(console.error);
    }).catch(console.error);
}

const stop = () => {
    client.destroy();
}

module.exports = {
    Discord,
    start,
    stop
}
