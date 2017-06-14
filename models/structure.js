//Structure of database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortSchema = new Schema({
    userUrl: String,
    shortUrl: String
}, {timestamp: true});

const ModelClass = mongoose.model('structure', shortSchema);

module.export = ModelClass;