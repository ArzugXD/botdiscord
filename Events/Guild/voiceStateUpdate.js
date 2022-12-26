const { PermissionsBitField, ChannelType } = require('discord.js');
const jointocreate = require('../../Models/jtc');

module.exports = {
    name: "voiceStateUpdate",
    async execute(client, oldState, newState) {
        const data = await jointocreate.findOne({
            guildid: oldState.guild.id || newState.guild.id
        });
        if(!data) return;

        if(newState?.channel == data?.channel){
            const {guild, user, voice, id} = newState.member;

            const parent = newState.channel?.parentId;
            const parentId = parent
            ? {
                parent,
            }
            : {};

            const voicechannel = await guild.channels.create({
                name: `${user.username}'s vc`,
                type: ChannelType.GuildVoice,
                ...parentId,
                permissionOverwrites: [
                    {
                        id: id,
                        allow: [
                            PermissionsBitField.Flags.Speak,
                            PermissionsBitField.Flags.Stream,
                        ],
                    },
                    {
                        id: guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                ],
            });
        }
        if(
            client.voicetemp.get(oldState.channelId) &&
            oldState.channel.member.size == 0
        )
        return oldState.channel.delete().catch(() => {});
    },
};