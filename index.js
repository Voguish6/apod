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
    https
    .get("https://api.nasa.gov/planetary/apod?api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk&date="+year + "-" + month + "-" + date, resp => {
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
                .setThumbnail('https://lh3.googleusercontent.com/proxy/uQ6NAXxYH9RKpUJP6gzSL3LdbdybIIsndupa6IHkdkQ7lfr7ZnFYQatUqaiAbDx8RmFetCejQ0vv1076qoprcMpXb8Jbrq8_kbhC-bUz5_eBs_RHb9c')
                .setImage(url)
                .setTimestamp()
                passedChannel.send(nasaEmbed);
             
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    })}


client.on("ready", function(){
    client.user.setActivity('the stars....🌌', { type: 'WATCHING' });
    console.log(`the client becomes ready to start`);
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.guilds.cache.forEach(guild => {
        guild.channels.cache.forEach(channel => {
            let nasaChannel = guild.channels.cache.find(channel => channel.name === 'nasa-pic-of-the-day')
            if(!nasaChannel) {
                console.log('Unable to find channel in ' + guild.name)
                break;
            }
            setInterval(function() {
                getPic(nasaChannel)
            })
        })
    })
    
    
});



    client.on('message', message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        if(command === 'help'){
            client.commands.get('help').execute(message, args);
        } else if (command == 'pic') {
            getPic(message.channel)
        }
    })
    


client.login(token)


