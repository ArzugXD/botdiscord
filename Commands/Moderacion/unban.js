const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Desbanea a alguien del servidor.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("la id del usuario que sera desbaneado.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`se desbaneo la id de <@${userId}> del servidor.`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Porfavor pon una ID valida.`)
                .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}