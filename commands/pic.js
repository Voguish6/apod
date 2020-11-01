module.exports = {
    name: 'pic',
    description: "Sends Nasa's Picture of the Day.",
    execute(message, args, picture, today){
            apod(message.channel, 'false', args, message.author)
    }};        