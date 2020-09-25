const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const https = require("https");
const { isContext } = require('vm');
const fs = require('fs');
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
// function createEmbed(color, title, description, thumbnail, image) {
//     const funcEmbed = new Discord.MessageEmbed();
//     .setColor(color);
//     .setTitle(title);
//     .setDescription(description);
//     .setThumbnail(thumbnail);
//     .setImage(image);
//     .setTimestamp();
//     return funcEmbed;
// }
function getPic(passedChannel) {
    var newDate = date();
    https
    .get("https://api.nasa.gov/planetary/apod?api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk&date="+newDate, resp => {
        let data = " ";
        resp.on("data", chunk => {
            data += chunk;
        })

        resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
                const nasaEmbed = new Discord.MessageEmbed()
                .setColor('#3A7DC6')
                .setTitle('Astronomy Picture of the Day!')
                .setDescription('Todays Picture:')
                .setThumbnail('https://i.ibb.co/2gt7TP3/Pin-Clipart-com-nasa-clipart-1116102.png')
                .setImage(url)
                .setTimestamp()
                passedChannel.send(nasaEmbed);
             
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
                
            })
        })
};

client.on("ready", function(){
    client.user.setActivity('the stars....🌌', { type: 'WATCHING' });
    console.log(`the client becomes ready to start`);
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);  
    msgAll();
    setInterval(() => msgAll(), 24*60*60*1000)
    
    
});



    client.on('message', message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        if(command === 'help'){
            client.commands.get('help').execute(message, args, Discord);
        } else if (command == 'pic') {
            getPic(message.channel)
        }
    })
    


client.login(token)


