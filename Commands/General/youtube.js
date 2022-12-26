const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription('Ordena y recive notificaciones de canales de youtube')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand => 
        subcommand.setName('añadir')
        .setDescription('canal del que quieres recibir notificaciones')
        .addStringOption(option => 
            option.setName('link')
            .setDescription('link del canal')
            .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('canal')
            .setDescription('canal donde seran enviadas las notificaciones')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand => 
        subcommand.setName('quitar')
        .setDescription('quita un canal registrado para que ya no envien notificaciones')
        .addStringOption(option => 
            option.setName('link')
            .setDescription('link del canal que ya no quieres recibir notificaciones')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand => 
        subcommand.setName('quitartodos')
        .setDescription('quita todos los canales registrados')
    )
    .addSubcommand(subcommand => 
        subcommand.setName('ultimovideo')
        .setDescription('recoje el ultimo video de un canal')
        .addStringOption(option => 
            option.setName('link')
            .setDescription('link del canal que quieres recibir el ultimo vdeo')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand => 
        subcommand.setName('info')
        .setDescription('recibe informacion del canal')
        .addStringOption(option => 
            option.setName('link')
            .setDescription('link del canal que quieres saber')
            .setRequired(true)
        )
    ),
    async execute(interaction, client) {
        const {options, guildId} = interaction;

        const sub = options.getSubcommand();
        const link = options.getString("link");
        const channel = options.getChannel('canal') || interaction.channel;

        const embed = new EmbedBuilder()

        try {
            switch (sub) {
                case "añadir":
                    client.ytp.setChannel(link, channel).then(data => {
                        interaction.reply({ embeds: [embed.setDescription(`✅ | Se añadio correctamente las notificaciones de ${data.YTchannel} a ${channel}`).setColor('Green').setTimestamp()] });
                    }).catch(err => {
                        console.log(err);
                        return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
                    });
                    break;
                case "quitar":
                            client.ytp.deleteChannel(guildId, channel).then(data => {
                                interaction.reply({ embeds: [embed.setDescription(`✅ | Se quito correctamente las notificaciones de ${channel} en ${guildId}`).setColor('Purple').setTimestamp()] });
                        }).catch(err => {
                            console.log(err);
                            return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
                        });
                        break;
                case "añadir":
                            client.ytp.deleteAllChannels(guildId).then(data => {
                                interaction.reply({ embeds: [embed.setDescription(`✅ | se borraron todos los canales registrados en ${guildId}`).setColor('Orange').setTimestamp()] });
                            }).catch(err => {
                                console.log(err);
                                return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
                            });
                            break;
                case "ultimovideo":
                                client.ytp.getLatestVideos(link).then(data => {
                                    embed.setTitle(`${data[0].title}`)
                                    .setURL(data[0].link)
                                    interaction.reply({embeds: [embed]});
                                    return interaction.channel.send({content: `${data[0].link}`});
                                }).catch(err => {
                                    console.log(err);
                                    return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
                                });
                            break;
                case "info":
                                client.ytp.getChannelInfo(link).then(data => {
                                    embed.setTitle(data.name)
                                    .addFields(
                                        {name: "URL", value: `${data.url}`, inline: true},
                                        {name: "Subscriptores", value: `${data.subscribers.split(" ")[0]}`, inline: true},
                                        {name: "Descripcion", value: `${data.description}`, inline: false},
                                    )
                                    .setImage(data.banner[0].url)
                                    .setTimestamp();
                                    interaction.reply({ embeds: [embed] });
                                }).catch(err => {
                                    console.log(err);
                                    return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
                                });
                            break;
            }
        } catch (err) {
            console.log(err);
            return interaction.reply({embeds: [embed.setColor('Red').setDescription('**A ocurrido un error contacta con el developer**')] })
        }

    }
}