"use strict";

const { Channel, Guild } = require('discord.js');
const fs = require('fs');
const path = require('path'); 

var {settings, Discord} = require("../bot");
const client = new Discord.Client();

var getProject = function () {
    var projects = {item: []};
    if(!fs.existsSync('projects.json')) createFile(); 

    fs.readFile('projects.json', function(err, data) {
        if(err) console.log('Project file does not exists, please create it.');;
        projects = data;
    });
    return projects;
}

var createProject = function (Project) {
    var projects = getProject().item.push(Project.get());
    
    console.log(projects);
    fs.appendFile('projects.json', projects, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    console.log('Project ' + Project.get().name + ' was created');
    

}

var delteProject = function (name) {
    var projects = getProject();
    for(var i = 0; i < projects.length;i++) {
        if(projects[i].get().name == name) {
            projects[i] = null;
        }
    }
    console.log('Project ' + Project.get().name + ' was deleted');
}

function createFile() {
    fs.appendFile('projects.json', '{"item": []}', function (err) {
        if (err) throw err;
    });
}

class Project {

    constructor(pname, pdescription, purl, pwebhook) {
        this.name = pname;
        this.url = purl;
        this.description = pdescription;
        this.webhook = pwebhook;
    }

    get() {
        return {
            name: this.name,
            url: this.url,
            description: this.description,
            webhook: this.webhook
        }
    }
}

module.exports = {
    Project,
    getProject,
    createProject,
    delteProject
}