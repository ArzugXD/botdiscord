const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'guildMemberRoleRemove',
    async execute(member, role, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
            .setTitle('Miembro perdio rol')
            .setColor('Red')
            .setDescription(`**${member.user.tag}** perdio el rol \`${role.name}\``);
        c.send({embeds: [embed]})
    }
}