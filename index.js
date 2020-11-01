const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", 'REACTION']});
const func = require('./functions.js')
const http = require("http");
const https = require("https");
const { isContext } = require('vm');
const fs = require('fs');
const prefix = "?"

var token = process.env.BOT_TOKEN;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on("messageReactionAdd", async function(reaction, user){
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.id === '756331800795545751') return;
    if (!reaction.message.guild) return;
    let role = reaction.message.guild.roles.cache.find(x => x.name === 'nasa');
    if (!role) {
        return;
    } else {
        if (reaction.emoji.name === '🪐'){
            try {
                console.log('Attempting to add a role.')
                await reaction.message.guild.members.cache.get(user.id).roles.add(role)
            } catch {
                console.log('Failed to add role to someone.')
            }
        }     
    }
});

client.on("messageReactionRemove", async function(reaction, user){
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.id === client.user.id) return;
    if (!reaction.message.guild) return;
    let role = reaction.message.guild.roles.cache.find(x => x.name === 'nasa');
    if (reaction.emoji.name === '🪐'){
        try {
            console.log('Attempting to remove a role.')
            await reaction.message.guild.members.cache.get(user.id).roles.remove(role)
        } catch {
            console.log('Failed to remove a role.')
        }
    }

});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
        // HELP
    if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
        // APOD
    } else if (command == 'pic') {
        var today = func.date();
        client.commands.get('pic').execute(message, args, func.apod, today)
        // MARS
    } else if (command == 'mars') {
        var today = func.date();
        client.commands.get('mars').execute(message, args, func.mars, today)
        // CATCH COMMAND ERRORS
    } else {
        message.channel.send('Unknown command.')
    }
})

setInterval(function(){
    var scheduleDate = new Date(); // Create a Date object to find out what time it is
    if(scheduleDate.getHours() === 14 && scheduleDate.getMinutes() === 0){ // Check the time
        msgAll();
        console.log('SCHEDULER: Completed job.')
    }
}, 60*1000); // Repeat every 60000 milliseconds (1 minute)

client.on("ready", async function(){
    client.user.setActivity('the stars....🌌', { type: 'WATCHING' });
    console.log(`VERISON: 1.0.2`);
    console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.login('NzU2MzMxODAwNzk1NTQ1NzUx.X2QS4Q.ySxevIkgW2PanxGu-FJajJphjII')

exports.https = https;
exports.Discord = Discord;
exports.client = client;


