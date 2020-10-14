const express = require('express');
const router = express.Router();

var {settings, Discord} = require("../bot");
const client = new Discord.Client();

router.use('/', (req, res, next) => {
    next();
});

router.get('/status', (req, res) => {
    var options = {
        status: settings.state,
        guilds: client.guilds.cache.map(guild => guild),
        users: client.users.cache.map(users => users)
    }
    
    res.json(options).status(200);
});

router.get('/start', (req, res) => {
    if(settings.state == 'offline') {
        client.login(process.env.BOT_TOKEN);
        settings.state = 'online';
        res.status(200).json({state: 200, message: 'Bot successfully started.', bot: settings.state});
        console.log('Bot successfully started.');
    }  else {
        res.status(400).json({state: 400, message: 'Bot already running.', bot: settings.state});
    }
});

router.get('/stop', (req, res) => {
    if(settings.state != 'offline') {
        client.destroy();
        settings.state = 'offline';
        res.status(200).json({state: 200, message: 'Bot successfully stopped.', bot: settings.state});
        console.log('Bot successfully stopped.');
    }  else {
        res.status(400).json({state: 400, message: 'Bot is not running.', bot: settings.state});
    }
});

module.exports = router;