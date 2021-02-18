"use strict";

const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {Discord, start} = require('./bot');
const client = new Discord.Client();

/*app.listen(8080, () => {
    
    console.log('Webserver is running.');
    //start(process.env.token);
});*/

//start(process.env.TOKEN);