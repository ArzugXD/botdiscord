const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'roleDelete',
    async execute(role, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Rol borrado')
        .setColor('Red')
        .setDescription(`Rol: ${role}\nNombre del rol: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}`);
        c.send({embeds: [embed]})
    }
}