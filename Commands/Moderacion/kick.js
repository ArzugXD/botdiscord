const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("expulsa a alguien del server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("usuario expulsado.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("razon")
                .setDescription("razon de la expulsion.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("usuario");
        const reason = options.getString("razon") || "no se dio razon";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`No puedes expulsar a ${user.username} porque tiene un rol mas alto.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Se expulso a ${user} con la razon: ${reason}`);

        await interaction.reply({
            embeds: [embed],
        });
    }
}