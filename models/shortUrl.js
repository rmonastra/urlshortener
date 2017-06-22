//Structure of database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    userUrl: String,
    shorterUrl: Number
});

const ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;