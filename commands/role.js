module.exports= {
    name: 'role',
    description: 'this is a role check.',
    execute(message, args) {
        let roleName = 'nasa';
        let role = message.guild.roles.cache.find(x => x.name === roleName);
        if (!role) {
            console.log("Role doesnt exist.")
        } else {
            console.log(`Role exists`)
}}}