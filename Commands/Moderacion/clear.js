const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("borra una cantidad especifica de mensajes.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('cantidad')
        .setDescription('cantidad de mensajes que se borraran.')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('usuario')
        .setDescription('Usuario que quieres borrarle los mensajes')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('cantidad');
        const target = options.getUser("usuario");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`correctamente se borraron ${messages.size} mensajes de ${target}.`);
                interaction.reply({embeds: [res]}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`correctamente se borraron ${messages.size} mensajes del canal.`);
                interaction.reply({embeds: [res]});
            });
        }
    }
}
