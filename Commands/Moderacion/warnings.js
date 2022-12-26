const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const warningSchema = require("../../Models/Warning");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Sistema completo de warns")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addSubcommand(subcommand => 
            subcommand.setName('add')
            .setDescription('Añade un warn a un miembro')
            .addUserOption(option => 
                option.setName('usuario')
                .setDescription('Selecciona un usuario')
                .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('motivo')
                    .setDescription('motivo del warn')
                    .setRequired(false)
                    )
                    .addStringOption(option =>
                        option.setName('evidencia')
                        .setDescription('evidencia del warn')
                        .setRequired(false)
                        )
        )
        .addSubcommand(subcommand => 
            subcommand.setName('check')
            .setDescription('Mira los warns de un user')
            .addUserOption(option => 
                option.setName('usuario')
                .setDescription('Selecciona un usuario')
                .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand.setName('remove')
            .setDescription('Quita un warn especificado')
            .addUserOption(option => 
                option.setName('usuario')
                .setDescription('Selecciona un usuario')
                .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('id')
                    .setDescription('Pon el ID del warn')
                    .setRequired(false)
                    )
        )
        .addSubcommand(subcommand => 
            subcommand.setName('clear')
            .setDescription('Quita todos los warns de un user')
            .addUserOption(option => 
                option.setName('usuario')
                .setDescription('Selecciona un usuario')
                .setRequired(true)
                )
        ),

        async execute(interaction){
            const {options, guildId, user, member} = interaction;

            const sub = options.getSubcommand(["add", "check", "remove", "clear"]);
            const target = options.getUser("usuario");
            const reason = options.getString("motivo") || "No se dio una razon.";
            const evidence = options.getString("evidencia") || "No se dio ninguna evidencia.";
            const warnId = options.getInteger("id") - 1;
            const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

            const userTag = `${target.username}#${target.discriminator}`;

            const embed = new EmbedBuilder();
            switch (sub) {
                case "add":
                    warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) =>{
                        if (err) throw err;

                        if(!data) {
                            data = new warningSchema({
                                GuildID: guildId,
                                UserID: target.id,
                                UserTag: userTag,
                                Content: [
                                    {
                                        ExecuterId: user.id,
                                        ExecuterTag: user.tag,
                                        Reason: reason,
                                        Evidence: evidence,
                                        Date: warnDate
                                    }
                                ],
                            })
                        } else {
                            const warnContent = {
                                ExecuterId: user.id,
                                ExecuterTag: user.tag,
                                Reason: reason,
                                Evidence: evidence,
                                Date: warnDate
                            }
                            data.Content.push(warnContent);
                        }
                        data.save();
                    });

                    embed.setColor("Green")
                    .setDescription(`Warn añadido a: ${userTag} | ||${target.id}||
                    **Razon**: ${reason}
                    **Evidencia**: ${evidence}
                    `)
                    .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                    .setTimestamp();

                interaction.reply({embeds: [embed]});

                    break;
                case "check":
                    warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) =>{
                        if (err) throw err;

                        if(data) {
                            embed.setColor("Green")
                            .setDescription(`${data.Content.map(
                                (w, i) =>
                                `**ID**: ${i + 1}
                                **Por**: ${w.ExecuterTag}
                                **Fecha**: ${w.Date}
                                **Razon**: ${w.Reason}
                                **Evidencia**: ${w.Evidence}\n\n
                                `
                            ).join(" ")}`)
                            .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                            interaction.reply({embeds: [embed]});
                        } else {
                           embed.setColor("Red")
                           .setDescription(`${userTag} | ||${target.id}|| no tiene warns`)
                           .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        interaction.reply({embeds: [embed]});
                        }
                    });
                    break;
                case "remove":
                    warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) =>{
                        if (err) throw err;

                        if(data) {
                            data.Content.splice(warnId, 1);
                            data.save();
                            
                            embed.setColor("Green")
                           .setDescription(`${userTag} warn id: ${warnId + 1} a sido quitado`)
                           .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        interaction.reply({embeds: [embed]});

                        } else {
                           embed.setColor("Red")
                           .setDescription(`${userTag} | ||${target.id}|| no tiene warns`)
                           .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        interaction.reply({embeds: [embed]});
                        }
                    });
                    break;
                case "clear":
                    warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) =>{
                        if (err) throw err;

                        if(data) {
                            await warningSchema.findOneAndDelete({GuildID: guildId, UserID: target.id, UserTag: userTag});
                            
                            embed.setColor("Green")
                           .setDescription(`todos los warns de ${userTag} han sido quitados | ||${target.id}||`)
                           .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        interaction.reply({embeds: [embed]});

                        } else {
                           embed.setColor("Red")
                           .setDescription(`${userTag} | ||${target.id}|| no tiene warns`)
                           .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        interaction.reply({embeds: [embed]});
                        }
                    });
                    break;
            }
        }
        
}