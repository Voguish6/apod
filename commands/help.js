module.exports= {
    name: 'help',
    description: 'this is a ping command.',
    execute(message, args, Discord){
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#3A7DC6')
        .setTitle('Help!')
        .setDescription('***Commands***:')
        .setThumbnail('https://i.ibb.co/2gt7TP3/Pin-Clipart-com-nasa-clipart-1116102.png')
        .addFields(
            {name: '?pic <date>', value: 'Sends the Astronomy Picture of the Day instantly. \n *Please use the format YYYY-MM-DD* \n __The first Nasa Apod began on January 1st 2000. Any dates before that will **NOT** work.__'},
            {name: '?help', value: 'Sends this message!'},
            {name: '?mars <date> <curiosity/opportunity/spirit>', value: 'Sends random pictures from the mars rovers from any date!'},
            {name: '***Setup***', value: '▬▬▬▬▬▬▬▬▬▬▬▬▬ ⬇️ ▬▬▬▬▬▬▬▬▬▬▬', inline : true},
            {name: '*Daily Messages*', value: "To setup daily messages of Nasa's Astronomy Picture of the Day, simply rename/create a channel with the name 'nasa'"},
            {name: '*Daily Pings*', value: "To setup a role to be pinged everyday on the daily message, simply rename/create a role with the name 'nasa'."}
        )
        .setTimestamp()
        message.channel.send(helpEmbed)
    }
}