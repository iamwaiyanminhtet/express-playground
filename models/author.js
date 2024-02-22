const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = Schema({
    name : String
}, {timestamps : true});

const Author = new mongoose.model('Author', authorSchema);
module.exports = Author;