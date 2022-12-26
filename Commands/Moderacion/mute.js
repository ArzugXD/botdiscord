const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mutea a alguien del server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("selecciona a quien deseas mutear.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("tiempo")
                .setDescription("cuanto durara el mute?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("razon")
                .setDescription("razon del mute?")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("usuario");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("tiempo");
        const convertedTime = ms(time);
        const reason = options.getString("razon") || "No se dio razon";

        const errEmbed = new EmbedBuilder()
            .setDescription('Algo sucedio mal. Contacta con el developer')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Muteado**")
            .setDescription(`Se muteo correctamente a ${user}.`)
            .addFields(
                { name: "Razon", value: `${reason}`, inline: true },
                { name: "Duracion", value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}