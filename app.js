"use strict";

const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {Discord} = require('./bot');
const client = new Discord.Client();

const api = require('./routers/api');

app.use('/api/', api);

app.listen(8080, () => {
    console.log('Webserver is running.');
});