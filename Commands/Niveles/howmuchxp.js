const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cuantoxp")
    .setDescription("Mira cuanta xp es necesaria para un nivel")
    .addIntegerOption(option => 
        option.setName('nivel')
        .setDescription('Nivel deseado')
        .setRequired(true)
    ),
    async execute(interaction) {
        const {options} = interaction;

        const nivel = options.getInteger("nivel");
        
        const xpAmount = Levels.xpFor(nivel);

        interaction.reply({content: `Necesitas ${xpAmount} xp para llegar al nivel ${nivel}`, ephemeral: true})
    }
}