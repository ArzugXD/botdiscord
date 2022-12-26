const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const { EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mira mi ping')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, options, client, user){
        const ping = new EmbedBuilder()
        .setTitle(`ping de ${client.user.username}`)
        .setDescription(`El mensaje se devolvio con **${client.ws.ping}ms**`)
        .setColor(`Blue`)
        interaction.reply({ embeds: [ping]})
    }
}