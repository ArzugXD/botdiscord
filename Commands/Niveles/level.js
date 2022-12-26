const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Ajusta el level de un user")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand => 
        subcommand.setName("add")
        .setDescription('Añade un level a un usuario')
        .addUserOption(option =>
            option.setName('miembro')
            .setDescription('Miembro que recibira el level')
            .setRequired(true)
            )
            .addIntegerOption(option =>
                option.setName('cantidad')
                .setDescription('cantidad de levels que recibira')
                .setMinValue(0)
                .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("remove")
            .setDescription('quita un level a un usuario')
            .addUserOption(option =>
                option.setName('miembro')
                .setDescription('Miembro que se le quitara un level')
                .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('cantidad')
                    .setDescription('cantidad de levels que se quitara')
                    .setMinValue(0)
                    .setRequired(true)
                    )
            )
            .addSubcommand(subcommand => 
                subcommand.setName("set")
                .setDescription('establecer el level de un usuario')
                .addUserOption(option =>
                    option.setName('miembro')
                    .setDescription('Miembro que recibira los levels')
                    .setRequired(true)
                    )
                    .addIntegerOption(option =>
                        option.setName('cantidad')
                        .setDescription('cantidad de levels que recibira')
                        .setMinValue(0)
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
                    await Levels.appendLevel(target.id, guildId, amount);
                    embed.setDescription(`Se añadieron ${amount} levels a ${target}`).setColor('Gold').setTimestamp();
                    break;
                case "remove":
                    await Levels.subtractLevel(target.id, guildId, amount);
                    embed.setDescription(`Se quitaron ${amount} levels a ${target}`).setColor('Gold').setTimestamp();
                    break;
                case "set":
                    await Levels.setXp(target.id, guildId, amount);
                    embed.setDescription(`Se establecio a ${target} los levels en ${amount}`).setColor('Gold').setTimestamp();
                    break;
            }
        } catch(err ) {
            console.log(err);
        }

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}