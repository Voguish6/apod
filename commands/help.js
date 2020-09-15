module.exports= {
    name: 'help',
    description: 'this is a ping command.',
    execute(message, args){
        channel.send('pong!')
    }
}