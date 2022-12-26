const { EmbedBuilder } = require("@discordjs/builders")

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client, guild ) {
       const c = await client.channels.fetch('1007085210728407092')
       const embed = new EmbedBuilder()
       .setDescription(`F Wachos el pibe <@${member.user.id}> se a ido del server espero vuelva pronto <:KrasterChiquito:1009608891245527070>`)
       c.send({ embeds: [embed]})
    }
}