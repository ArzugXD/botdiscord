const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'channelDelete',
    async execute(channel, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Canal borrado')
        .setColor('Red')
        .setDescription(`${channel.name} a sido borrado`);
        c.send({embeds: [embed]})
    }
}