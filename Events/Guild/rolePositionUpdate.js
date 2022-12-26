const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'rolePositionUpdate',
    async execute(role, oldPosition, newPosition, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Role Position Updated')
        .setColor('Green')
        .setDescription(role.name + " rol estaba en posicion " + oldPosition + " y ahora esta en " + newPosition);
        c.send({embeds: [embed]})
    }
}