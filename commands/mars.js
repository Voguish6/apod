module.exports = {
    name: 'mars',
    description: "Sends random pictures from the mars rovers.",
    execute(message, args, mars, today){
            mars(message.channel, args, message.author, args[1])
    }};        