const {EmbedBuilder}  = require('discord.js');
module.exports = {
    name: 'guildBannerAdd',
    async execute(guild, bannerURL, client){
        const c = await client.channels.fetch('1006741774255001711')
        const embed = new EmbedBuilder()
        .setTitle('el server tiene un nuevo banner')
        .setColor('Green')
        .setImage(bannerURL)
        c.send({embeds: [embed]})
    }
}