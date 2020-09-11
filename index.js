const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const https = require("https");
const { isContext } = require('vm');
var token = process.env.BOT_TOKEN;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();

function getPic() {
    https
    .get("https://api.nasa.gov/planetary/apod?api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk&date="+year + "-" + month + "-" + date, resp => {
        let data = " ";
        resp.on("data", chunk => {
            data += chunk;
        })

        resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
            client.guilds.cache.forEach((guild) => {
                setInterval (function() {
                const channel = guild.channels.cache.find(channel => channel.name === "nasa-pic-of-the-day")
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#3A7DC6')
                .setTitle('Astronomy Picture of the Day!')
                .setDescription('Todays Picture:')
                .setThumbnail('https://lh3.googleusercontent.com/proxy/n5sEAzXHCzfxMROLim39lpnLfTnUhI-W-f2RIW7aB7iKKzUQidbgaJHRzapeD8T6PpciNMvxkPVmBAsv281u_GvGiImKMpldlSQFPvsnuiXDgjUkrDA')
                .setImage(url)
                .setTimestamp()

                channel.send(exampleEmbed);
                // console.log(pictureURL)
            }, 24*60*60*1000)}); 
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    });


}

client.on("ready", function(){
    client.user.setActivity('the stars....', { type: 'WATCHING' });
    console.log(`the client becomes ready to start`);
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    getPic(); 
    });



client.login(token)


