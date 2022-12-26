module.exports = {
    name: 'guildBoostLevelDown',
    async execute(guild, oldLevel, newLevel, client){
        const c = await client.channels.fetch('1009819987504017478')
        const embed = new EmbedBuilder()
        .setTitle('El servidor bajo de nivel')
        .setColor('Pink')
        .setDescription(`${guild.name} perdio el nivel ${oldLevel} y ahora esta en el nivel ${newLevel}`);
        c.send({embeds: [embed]})
    }
}