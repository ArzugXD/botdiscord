
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'userUsernameUpdate',
    async execute(user, oldUsername, newUsername, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Username cambiado')
        .setColor('Green')
        .setDescription(`${user.tag} cambio su username de ${oldUsername} a ${newUsername}`);
        c.send({embeds: [embed]})
    }
}