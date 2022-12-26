const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'guildMemberBoost',
    async execute(member, client){
        const c = await client.channels.fetch('1009819987504017478')
        const embed = new EmbedBuilder()
        .setTitle('Usuario empezo a boostear!')
        .setColor("DarkVividPink")
        .setDescription(`**${member.user.tag}** empezo a boostear  ${member.guild.name}!`);
        c.send({embeds: [embed]})
    }
}