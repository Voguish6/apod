const index = require('./index.js')


function apod(passedChannel, togglePing, date, author) {
    let role = passedChannel.guild.roles.cache.find(x => x.name === 'nasa');
    if (!role) {
        var togglePing = 'false'
    } 

    index.https
    .get("https://api.nasa.gov/planetary/apod?api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk&date="+date, resp => {
        let data = " ";
        resp.on("data", chunk => {
            data += chunk;
        })
        resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
            let desc = JSON.parse(data).explanation;
            try {if(desc.length > 1024) desc = desc.substring(0,1019)} catch {
                let genEmbed = createEmbed('#0099ff', 'Error!', '<@' + author + '>' + '***That is not a valid date!*** \n *Please use the format YYYY-MM-DD* \n __The first Nasa Apod began on January 1st 2000. Any dates before that will **NOT** work.__', 'https://img.icons8.com/pastel-glyph/2x/error.png', )
                passedChannel.send(genEmbed)
                return
            }
                const nasaEmbed = new index.Discord.MessageEmbed()
                .setColor('#3A7DC6')
                .setTitle('Astronomy Picture of the Day!')
                .setThumbnail('https://i.ibb.co/2gt7TP3/Pin-Clipart-com-nasa-clipart-1116102.png')
                .setImage(url)
                .setTimestamp()
                .addField('**Description**' , "*" + desc + '...' + "*")
                .setURL('https://apod.nasa.gov/')
                if (togglePing === 'true') {
                    nasaEmbed.setDescription(`<@&` + role + `>` + ' Todays Picture:');
                } else if(togglePing === 'false') {
                    nasaEmbed.setDescription('Todays Picture:');
                }
                    passedChannel.send(nasaEmbed).then(embed => {
                        embed.react(`🪐`)
                })
            
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    })
    }

function mars(passedChannel, date, author, rover) {
    index.https
    .get("https://api.nasa.gov/mars-photos/api/v1/rovers/"+ rover + "/photos?earth_date=" + date + "&api_key=QBj6HhO1zMguPDxu9DfKpjqmmknQS6PgP6y7h0Sk", resp => {
        let data = " ";
        resp.on("data", chunk => {
            data += chunk;
        })
        resp.on("end", () => {
            if(resp.statusCode != 200) {
                let genEmbed = createEmbed('#0099ff', 'Error!', '<@' + author + '>' + '***That is not the correct format!*** \n *Please use the format "**?mars YYYY-MM-DD <rover>"** \n Example: "?mars 2020-10-31 curiosity"* ', 'https://img.icons8.com/pastel-glyph/2x/error.png', )
                passedChannel.send(genEmbed)
                return;
            }
            let urlList = []
            let photos = JSON.parse(data).photos
            for(var k in photos) {
                if(photos[k]) {
                    let url = photos[k].img_src;
                    urlList.push(url)
                }
            }
            if(urlList.length == 0) {
                let genEmbed = createEmbed('#0099ff', 'Error!', '<@' + author + '>' + '***There are no pictures from that date!*** \n *Please try another date!* ', 'https://img.icons8.com/pastel-glyph/2x/error.png', )
                passedChannel.send(genEmbed)
                return;
        }
            var i;
            for (i = 0; i < 5; i++) {
                let newEmbed = createEmbed('#981212', '**Rover Picture #**' + i, 'This image is from ***' + rover + '***', 'https://cdn.iconscout.com/icon/premium/png-512-thumb/mars-rover-617867.png')
                newEmbed.setImage(urlList[Math.floor(Math.random() * Math.floor(urlList.length))])
                passedChannel.send(newEmbed)
            }

                })
            
        })
    .on("error", err => {
        console.log("Error: " + err.message);
    })
    }
    
function msgAll() {
    index.client.guilds.cache.forEach(guild => {
        guild.channels.cache.forEach(channel => {
            if(!channel.name === 'apod') {
                console.log('Unable to find channel in: ' + guild.name)
            }
            if(channel.name === 'apod') {
                var today = date();
                apod(channel, 'true', today)
            }
})})};

function createEmbed(color, title, description, thumbnail) {
    var embed = new index.Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);
    return embed;
}

function date() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
}
    
exports.date = date;
exports.createEmbed = createEmbed;    
exports.apod = apod;
exports.msgAll = msgAll;
exports.mars = mars;
