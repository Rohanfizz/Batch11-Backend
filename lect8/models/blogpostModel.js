const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    userName: {
        type: String,
        required: [true, "Please provide a userName."],
    },
    image: {
        type: String,
        required: [true, "Please provide an image link."],
    },
    description: {
        type: String,
        required: [true, "Please provide a description."],
    },
    
    likes: {
        type: Number,
        default: 0,
    },
    
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
