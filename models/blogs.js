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
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "Author"
    }
}, {timestamps : true});

const Blog = new mongoose.model('Blog', blogSchema);
module.exports = Blog;