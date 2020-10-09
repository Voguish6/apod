const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", 'REACTION']});
const http = require("http");
const https = require("https");
const { isContext } = require('vm');
const fs = require('fs');
const e = require('express');
const prefix = "?"
var token = process.env.BOT_TOKEN;
function date() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    console.log('New Date Grabbed')
    return year + "-" + month + "-" + date;
}

 




client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

function getPic(passedChannel, togglePing) {
    let role = passedChannel.guild.roles.cache.find(x => x.name === 'nasa');
    if(!role) {
        let togglePing = 'false'
    }
    var newDate = date();
    https
    .get("https://api.nasa.gov/planetary/apod?api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk&date="+newDate, resp => {
        let data = " ";
        resp.on("data", chunk => {
            data += chunk;
        })

        resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
            let desc = JSON.parse(data).explanation;
            console.log(desc.length)
            if(desc.length > 1024) desc = desc.substring(0,1019);
                const nasaEmbed = new Discord.MessageEmbed()
                .setColor('#3A7DC6')
                .setTitle('Astronomy Picture of the Day!')
                .setThumbnail('https://i.ibb.co/2gt7TP3/Pin-Clipart-com-nasa-clipart-1116102.png')
                .setImage(url)
                .setTimestamp()
                .addField('**Description**' , "*" + desc + '...' + "*")
                .setURL('https://apod.nasa.gov/')
                if (togglePing = 'true') {
                    nasaEmbed.setDescription(`<@&` + role + `>` + ' Todays Picture:');
                } else if(togglePing = 'false') {
                    nasaEmbed.setDescription('Todays Picture:');
                }
                // if (togglePing = "true") {
                //     try {
                //         let role = passedChannel.guild.roles.cache.find(x => x.name === 'nasa');
                //         nasaEmbed.setDescription(`<@&` + role + `>` + ' Todays Picture:')
                //     } catch {
                //         nasaEmbed.setDescription('Todays Picture:')
                //     }                    
                // } else if(togglePing = "false"){
                //         nasaEmbed.setDescription('Todays Picture:')
                //     }
                    
                    passedChannel.send(nasaEmbed).then(embed => {
                        embed.react(`🪐`)
                })
             
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    })}
function msgAll() {
        client.guilds.cache.forEach(guild => {
            guild.channels.cache.forEach(channel => {
                if(!channel.name === 'nasa') {
                    console.log('Unable to find channel in: ' + guild.name)
                }
                if(channel.name === 'nasa') {
                    getPic(channel)
                }
})})};

client.on("ready", function(){
    client.user.setActivity('the stars....🌌', { type: 'WATCHING' });
    console.log(`VERISON: 1.0.2`);
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);  
});

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
    
        if(command === 'help'){
            client.commands.get('help').execute(message, args, Discord);
        } else if (command == 'pic') {
            getPic(message.channel, 'false')
            // let role = message.guild.roles.cache.find(x => x.name === 'nasa');
            // message.channel.send(`<@&` + role + `>`)
        }
    })
    
    setInterval(function(){
        var scheduleDate = new Date(); // Create a Date object to find out what time it is
        if(scheduleDate.getHours() === 14 && scheduleDate.getMinutes() === 0){ // Check the time
            msgAll();
            console.log('SCHEDULER: Completed job.')
        }
    }, 60*1000); // Repeat every 60000 milliseconds (1 minute)
    
client.login('NzU2MzMxODAwNzk1NTQ1NzUx.X2QS4Q.NSLCt_hVALTu4c0-i3mfYpiSOoY')


