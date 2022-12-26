const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'messageContentEdited',
    async execute(message, oldContent, newContent, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('Mensaje editado')
        .setColor('Grey')
        .setDescription(`Mensaje cambio de \`${oldContent}\` a \`${newContent}\` por ${message.author}`);
        c.send({embeds: [embed]})
    }
}