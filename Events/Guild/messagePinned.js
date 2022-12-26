const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'messagePinned',
    async execute(message, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('mensaje fijado')
        .setColor('Grey')
        .setDescription(```${message}`` a sido fijado por **${message.author}**`);
        c.send({embeds: [embed]})
    }
}