const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Ajusta el xp de un user")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand => 
        subcommand.setName("add")
        .setDescription('Añade xp a un usuario')
        .addUserOption(option =>
            option.setName('miembro')
            .setDescription('Miembro que recibira la xp')
            .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName('cantidad')
                .setDescription('cantidad de xp que recibira')
                .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("remove")
            .setDescription('quita xp a un usuario')
            .addUserOption(option =>
                option.setName('miembro')
                .setDescription('Miembro que se le quitara la xp')
                .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('cantidad')
                    .setDescription('cantidad de xp que se quitara')
                    .setRequired(true)
                    )
            )
            .addSubcommand(subcommand => 
                subcommand.setName("set")
                .setDescription('establecer el xp de un usuario')
                .addUserOption(option =>
                    option.setName('miembro')
                    .setDescription('Miembro que recibira la xp')
                    .setRequired(true)
                    )
                    .addIntegerOption(option =>
                        option.setName('cantidad')
                        .setDescription('cantidad de xp que recibira')
                        .setRequired(true)
                        )
                ),
    async execute(interaction) {
        const {options, guildId} = interaction;

        const sub = options.getSubcommand();
        const target = options.getUser("miembro")
        const amount = options.getInteger("cantidad")
        const embed = new EmbedBuilder();
        try {
            switch (sub) {
                case "add":
                    await Levels.appendXp(target.id, guildId, amount);
                    embed.setDescription(`Se añadio ${amount} de xp a ${target}`).setColor('Gold').setTimestamp();
                    break;
                case "remove":
                    await Levels.appendXp(target.id, guildId, amount);
                    embed.setDescription(`Se quito ${amount} de xp a ${target}`).setColor('Gold').setTimestamp();
                    break;
                case "set":
                    await Levels.substrackXp(target.id, guildId, amount);
                    embed.setDescription(`Se establecio a ${target} la xp en ${amount}`).setColor('Gold').setTimestamp();
                    break;
            }
        } catch(err ) {
            console.log(err);
        }

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}