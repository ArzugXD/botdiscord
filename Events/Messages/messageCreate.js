const {EmbedBuilder} = require('discord.js');
const Levels = require('discord.js-leveling')

module.exports = {
    name: 'messageCreate',

    async execute(message, client) { 
        if(!message.guild || message.author.bot) return;

        if(message.content.length < 3) return

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const c = await client.channels.fetch('1006771764749148260')
            const levelEmbed = new EmbedBuilder()
            .setTitle('Nuevo nivel alcanzado!')
            .setDescription(`**Vamoos** <@${message.author.id}>, tas subiendo de nivel re contra papu as llegado al nivel **${user.level}** ¡¡¡¡¡¡¡¡sigue asi y seras un lobo LEGEEND!!!!!!!`)
            .setImage('https://media.discordapp.net/attachments/1008412763070140526/1008413329473163355/videotogif_2022.08.14_09.36.59.gif')
            .setColor("Random")
            .setTimestamp();

        const sendEmbed = c.send({embeds: [levelEmbed]});
        }

    }
}