const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sugestion")
        .setDescription("sugestiona algo.")
        .addStringOption(option =>
            option.setName("nombre")
                .setDescription("nombre de tu sugestion.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("descripcion")
                .setDescription("describe tu sugestion.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("nombre");
        const description = options.getString("descripcion");

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Sugestion hecha por: ${member}`)
            .addFields(
                { name: "Sugestion", value: `${name}` },
                { name: "Descripcion", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('1047268887915405433').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Tu sugestion a sido enviada", ephemeral: true });
    }
}