const Discord = require('discord.js');
const client = new Discord.Client();

var settings = {state: 'offline'};

client.on('ready', (event) => {
    console.log('Logged in as ' + client.user.tag);
    client.user.setActivity('Just chilli´n');
    client.user.setStatus('idle');
});

client.on("disconnect", (event) => {
    client.user.setStatus('offline');
    console.log('Bot Disconnected.');
});

client.on('message', (event) => {
    if(event.content === '!stop') {
        event.reply('restarting...');
    } else if(event.content === '!restart') {
        client.destroy
    }
});

module.exports = {
    Discord,
    settings
}
