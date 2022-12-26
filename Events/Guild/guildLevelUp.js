const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'guildMemberUnboost',
    async execute(guild, oldLevel, newLevel, client){
        const c = await client.channels.fetch('1009819987504017478')
        const embed = new EmbedBuilder()
        .setTitle('Nivel subido!')
        .setColor('Pink')
        .setDescription(`${guild.name} consigio el nivel ${newLevel}`);
        c.send({embeds: [embed]})
    }
}