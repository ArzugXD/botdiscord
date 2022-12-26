const afkModel = require('../../Models/Afk')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if(message.author.bot || !message.guild) return;

        afkModel.findOne({Guild: message.guild.id, UserID: message.author.id}, async (err, data) => {
            if(data.Afk) {
                data.Afk = false;
                data.save();
            }
            return;s
        });
        
        const taggedMembers = message.mentions.users.map(msg => msg.id);

        if(taggedMembers.lenght > 0) {
            taggedMembers.forEach(m => {
                afkModel.findOne({Guild: message.guild.id, UserID: m }, async (err, data) => {
                    if (data.Afk) {
                        message.channel.send('Este user esta **AFK**');
                    }
                    return;
                })
            })
        }
    }
}