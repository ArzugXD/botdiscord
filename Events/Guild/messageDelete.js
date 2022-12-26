const {EmbedBuilder} = require('discord.js')

module.exports = {
    name:'messageDelete',
    async execute(message, client){
        if(message.author.bot) return
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Mensaje borrado')
        .setColor('Red')
        .setDescription(`
        **Autor : ** <@${message.author.id}> - *${message.author.tag}*
        **Fecha : ** ${message.createdAt}
        **Canal : ** <#${message.channel.id}> - *${message.channel.name}*
        **Mensaje borrado : ** \`${message.content.replace(/`/g, "'")}\`
     `);
     c.send({embeds: [embed]})
    }
}