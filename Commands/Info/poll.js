const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Crea una poll y enviala a un canal")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("descripcion")
                .setDescription("Describe el poll")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("canal")
                .setDescription("Donde la quieres enviar?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("canal");
        const description = options.getString("descripcion");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setDescription(description)
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❌");
            await interaction.reply({ content: "La poll se envio correctamente", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}