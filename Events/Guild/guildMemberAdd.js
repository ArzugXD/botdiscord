const Discord = require('discord.js')
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')


module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
     const c = await client.channels.fetch('1007085210728407092')
     const embed = new EmbedBuilder()
     .setDescription(`Bienvenid@ **<@${member.id}>** a <:KrasterMCLive:1036270591713488906> La Cueva de Kraster\n\nRecuerda leer las <#1006734021167952023> para evitar conflictos en algun futuro y <#1006962618306658476> para poder ver los demas canales y hablar con los demás\n\nPásala bien papú y FELIZ NAVIDEICHON!!!! :KrasterDance: \n`)
     .setFooter({text:`Ahora somos: ${member.guild.memberCount}`})
     .setImage(`https://cdn.discordapp.com/attachments/1047178131506737196/1048282232428691566/Kraster_navidad.png`)
     .setThumbnail(member.displayAvatarURL({ dynamics: true}))
     c.send({embeds: [embed]})
  }
}