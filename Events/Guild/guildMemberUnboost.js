const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'guildMemberUnboost',
    async execute(member, client, guild){
        const c = await client.channels.fetch('1009819987504017478')
        .setTitle('Usuario dejo de boostear!')
        .setColor('Pink')
        .setDescription(`**${member.user.tag}** a parado de boostear ${member.guild.name}!`);
        c.send({embeds: [embed]})
    }
}