const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const https = require("https");
const { isContext } = require('vm');
const fs = require('fs');
const prefix = "?"
var token = process.env.BOT_TOKEN;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on("ready", function(){
    client.user.setActivity('the stars....🌌', { type: 'WATCHING' });
    console.log(`the client becomes ready to start`);
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    getPic(); 
    });


    client.on('message', message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        if(command === 'help'){
            client.commands.get('help').execute(message, args);
        } else if (command == 'ping') {
        }
    })
    


client.login(token)


