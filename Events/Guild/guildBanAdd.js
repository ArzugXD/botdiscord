const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'guildBanAdd',
    async execute({guild, user, client}){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Usuario baneado')
        .setColor('Red')
        .setDescription(`Usuario: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({ dynamic: true }));
        c.send({embeds: [embed]})
    }
}