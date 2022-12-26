const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const levels = require("discord.js-leveling");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Mira el leaderboard del servidor'),

    async execute(interaction, client) {

        const {guildId} = interaction;

        const rawLeaderBoard = await levels.fetchLeaderboard(guildId, 10)

        if(rawLeaderBoard.length < 1) return interaction.reply("No hay nadie en el leaderboard")

        const embed = new EmbedBuilder()
        
        const leaderboard = await levels.computeLeaderboard(client, rawLeaderBoard, true);

        const lb = leaderboard.map(e => `**${e.position}** ${e.username}#${e.discriminator}\n**Nivel:** ${e.level}\n**XP:** ${e.xp.toLocaleString()}`);

        embed.setTitle("Leaderboard del servidor").setDescription(lb.join("\n\n")).setTimestamp();

        return interaction.reply({embeds: [embed]})

    },
};
