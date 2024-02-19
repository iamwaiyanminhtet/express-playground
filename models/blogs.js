const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = Schema({
    title : {
        type : String,
        required : true
    },
    post : {
        type : String,
        required : true
    }
}, {timestamps : true});

const Blog = new mongoose.model('Blog', blogSchema);
module.exports = Blog;