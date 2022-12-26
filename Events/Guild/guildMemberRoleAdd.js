const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'guildMemberRoleAdd',
    async execute(member, role, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Miembro obtuvo rol')
        .setColor('Green')
        .setDescription(`**${member.user.tag}** obtuvo el rol \`${role.name}\``);
        c.send({embeds: [embed]})
    }
}