var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
    id: String,
    blockFontSize: String,
    headlineFontSize: String,
    headlineColor: String,
    blockColor: String,
    blockBgColor: String,
    blockWidth: String,
    blockHeight: String,
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Setting', SettingSchema);