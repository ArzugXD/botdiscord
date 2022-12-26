const jtc = require('../../Models/jtc');
const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('jointocreate')
    .setDescription("Unete para crear un canal de voz propio")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option.setName('canal')
        .setDescription("Unete y crea un canal")
        .setRequired(true)),
    
    async execute(interaction) {
        const { options } = interaction;
        const channel = options.getChannel('canal');
        data = 
        (await jtc.findOne({ guildid: interaction.guild.id})) ||
        (await jtc.create({ guildid: interaction.guild.id}));

        data.channel = channel.id;
        await data.save();

        interaction.reply({
            content: `El canal: ${channel} a sido establecido en join to create`
        });
    },
};