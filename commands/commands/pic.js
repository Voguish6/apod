module.exports = {
    name: 'pic',
    description: "Sends Nasa's Picture of the Day.",
    execute(message, args){
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
                    }, 24*60*60*1000)}); 
                });
            })
            .on("error", err => {
                console.log("Error: " + err.message);
            })}}};        
        