module.exports = {
    name: 'ping',
    description: 'Responds',
    execute(message, args){
        channel.send("pong!")
    }
}