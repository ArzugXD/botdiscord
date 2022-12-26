const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('crearverificacion')
    .setDescription('Pon tu canal de verificacion')
    .addChannelOption(option =>
        option.setName('canal')
        .setDescription('manda el embed de verificacion a ese canal')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('canal');
        const verifyEmbed = new EmbedBuilder()
        .setTitle("Verificacion")
        .setDescription('ola.')
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verificar').setLabel('✅').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({content: 'Ocurrio un error intentalo mas tarde.', ephemeral: true});
        } else {
            return interaction.reply({content: 'El canal de verificacion fue añadido correctamente.', ephemeral: true});
        }
    },
};