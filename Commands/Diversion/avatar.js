const { EmbedBuilder } = require('@discordjs/builders');
const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Muestra un avatar")
    .addUserOption(option =>
        option.setName('miembro')
        .setDescription("Miembro")
        .setRequired(false)),
    
    async execute(interaction) {
        const { options, member, user } = interaction;
        const mem = options.getUser('miembro') || author.displayAvatarURL({dynamic: true});
        const a = new EmbedBuilder()
        .setDescription(`avatar de ${mem}`)
        .setImage(mem.displayAvatarURL({dynamic: true}))

        interaction.reply({
            embeds: [a]
        });
    },
};