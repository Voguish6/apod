module.exports= {
    name: 'help',
    description: 'this is a ping command.',
    execute(message, args){
        message.channel.send('pong!')
    }
}