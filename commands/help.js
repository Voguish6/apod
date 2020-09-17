module.exports= {
    name: 'help',
    description: 'this is a ping command.',
    execute(message, args, Discord){
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#3A7DC6')
        .setTitle('Help!')
        .setDescription('Commands:')
        .setThumbnail('https://i.ibb.co/2gt7TP3/Pin-Clipart-com-nasa-clipart-1116102.png')
        .addFields({
            name: '?pic', value: 'Sends the Astronomy Picture of the Day instantly.',
            name: '?help', value: 'Sends this embed!'
        })
        .setTimestamp()
        message.channel.send(helpEmbed)
    }
}