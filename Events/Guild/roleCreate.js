const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'roleCreate',
    async execute(role, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Role Added')
        .setColor('Red')
        .setDescription(`Rol: ${role}\nNombre del rol: ${role.name}\nID del rol: ${role.id}\nHEX Code: ${role.hexColor}`);
        c.send({embeds: [embed]})
    }
}