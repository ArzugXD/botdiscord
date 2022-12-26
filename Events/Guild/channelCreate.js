const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'channelCreate',
    async execute(channel, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Canal creado')
        .setColor('Green')
        .setDescription(`${channel.name} a sido creado.`);
        c.send({embeds: [embed]})
    }
}