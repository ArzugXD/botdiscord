const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const levels = require("discord.js-leveling");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Mira el rank de alguien')
    .addUserOption(option =>
        option.setName('miembro')
            .setDescription('A quien le miraras el rank')
        ),
    async execute(interaction) {

        const {options, guildId, user} = interaction;

        const member = options.getUser('miembro') || user;

        const levelUser = await levels.fetch(member.id, guildId);

        const embed = new EmbedBuilder()
        if(!levelUser) return interaction.reply({content: 'Parece ser que este miembro no a conseguido xp'});

        embed.setDescription(`**<@${member.id}>** es actualmente nivel **${levelUser.level}** y tiene ${levelUser.xp.toLocaleString()} xp`)
        .setColor('Random').setTimestamp();
        interaction.reply({embeds: [embed]})
    },
};
