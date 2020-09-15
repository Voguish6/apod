const { Channel } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Responds',
    execute(message, args){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#3A7DC6')
        .setTitle('Astronomy Picture of the Day!')
        .setDescription('Todays Picture:')
        .setThumbnail('https://lh3.googleusercontent.com/proxy/n5sEAzXHCzfxMROLim39lpnLfTnUhI-W-f2RIW7aB7iKKzUQidbgaJHRzapeD8T6PpciNMvxkPVmBAsv281u_GvGiImKMpldlSQFPvsnuiXDgjUkrDA')
        .setImage(url)
        .setTimestamp()
        channel.send(exampleEmbed)
    }
}