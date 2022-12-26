const mongoose = require("mongoose");

const jtc = mongoose.model(
    "jointocreate",
    new mongoose.Schema({
        guildid: { type: String },
        channel: { type: String },
    })
);

module.exports = jtc;