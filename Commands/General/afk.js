const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, DataResolver} = require("discord.js");
const afkModel = require("../../Models/Afk")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Ponte en tu estado AFK')
    .addStringOption(option =>
        option.setName("motivo")
            .setDescription("Porque te pones AFK")
            .setRequired(false)
    ),
    async execute(interaction){
        const {guildId, user, options} = interaction;

        const motiv = options.getString("motivo") || "No se dio motivo";

        await afkModel.findOne({Guild: guildId, UserID: user.id}, async (err, data) => {
            try{
                if(!data) {
                    await afkModel.create({
                        Guild: guildId,
                        UserID: user.id,
                        Afk: true
                    })
                } else if (data.Afk) {
                    data.Afk = false;
                    data.save();
                    return interaction.reply({content: `${user.tag} ya **No** esta **AFK**`});
                } else {
                    data.Afk = true;
                    data.save();
                }
                return interaction.reply({content: `${user.tag} se puso afk | motivo: ||${motiv}||`})
            } catch(e) {
                console.log(e);
            }
        }).clone();
    },
};