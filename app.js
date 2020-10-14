const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const {Discord} = require('./bot');
const client = new Discord.Client();

const settings = {state: 'offline'};

app.on('/*', (req, res, next) => {
    console.log('Request to webserver');
    next();
});

app.get('/start', (req, res) => {
    if(settings.state == 'offline') {
        console.log(process.env.BOT_TOKEN);
        client.login(process.env.BOT_TOKEN);
        settings.state = 'online';
        res.status(200).json({state: 200, message: 'Bot successfully started.', bot: settings.state});
        console.log('Bot successfully started.');
    }  else {
        res.status(400).json({state: 400, message: 'Bot already running.', bot: settings.state});
    }
});

app.get('/stop', (req, res) => {
    if(settings.state != 'offline') {
        client.destroy();
        settings.state = 'offline';
        res.status(200).json({state: 200, message: 'Bot successfully stopped.', bot: settings.state});
        console.log('Bot successfully stopped.');
    }  else {
        res.status(400).json({state: 400, message: 'Bot is not running.', bot: settings.state});
    }
});

app.listen(8080, () => {
    console.log('Webserver is running.');
});